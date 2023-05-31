# How to use HTTP outcalls: GET

A minimal example to make a `GET` HTTPS request. The example will be in both Motoko and in Rust.

## Motoko version

### Structure of the code

Before we dive in, here is the structure the code we will touch:

Here are `src/backend_canister/main.mo` will look like:

```motoko

//Import some custom types from `src/backend_canister/Types.mo` file
import Types "Types";

actor {

//method that uses the HTTP outcalls feature and returns a string
  public func foo() : async Text {

    //declare the IC management canister
    let ic : Types.IC = actor ("aaaaa-aa");

    //code that uses the management canister
    let request : Types.HttpRequestArgs = {
        //construct the request
    };

    //send the http request
    let response : Types.HttpResponsePayload = await ic.http_request(request);

    //return response
    response
  };
};
```

Here is what `src/backend_canister/Types.mo` will look like:

```motoko
module Types {

    //type declarations for HTTP requests, HTTP responses, IC management canister, etc...

}
```

### Step by Step

To create a new project directory for testing access control and switching user identities:

- #### Step 1:  Open a terminal shell on your local computer, if you don’t already have one open.

- #### Step 2:  Change to the folder you are using for your Internet Computer blockchain projects, if you are using one.

- #### Step 3:  Create a new project by running the following command:

```bash
dfx new hello_http
cd hello_http
```

- #### Step 4:  Open the `src/hello_http_backend/main.mo` file in a text editor and replace content with:

```motoko
import Debug "mo:base/Debug";
import Blob "mo:base/Blob";
import Cycles "mo:base/ExperimentalCycles";
import Error "mo:base/Error";
import Array "mo:base/Array";
import Nat8 "mo:base/Nat8";
import Text "mo:base/Text";

//import the custom types we have in Types.mo
import Types "Types";


//Actor
actor {

  //Method: This method sends a GET request to a URL with a free API we can test with
  //In particular, this free API returns a fact about cats.
  //example output: "{"fact":"A happy cat holds her tail high and steady.", "length":43 }"
  public func get_cat_fact() : async Text {

    let url = "https://catfact.ninja/fact";

    //print to the console
    Debug.print("[Backed canister] calling url: " # url);

    //A minimal http request
    let http_request : Types.HttpRequestArgs = {
        url = url;
        max_response_bytes = null; //optional for request
        headers = [];
        body = null; //optional for request
        method = #get;
        transform = null; //optional for request
    };

    //Declare the IC Management Canister so we can use it to make the HTTP request
    let ic : Types.IC = actor ("aaaaa-aa");

    //The IC specification spec says, "Cycles to pay for the call must be explicitly transferred with the call"
    //IC management canister will make the HTTP request so it needs cycles
    //See: https://internetcomputer.org/docs/current/motoko/main/cycles
    //The way Cycles.add() works is that it adds those cycles to the next asynchronous call
    //"Function add(amount) indicates the additional amount of cycles to be transferred in the next remote call"
    //See: https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-http_request
    Cycles.add(17_000_000_000);
    
    //Since the cycles were added above, we can just call the IC management canister with HTTPS outcalls below
    let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);
    
    //As per the type declarations in Types.mo, the BODY in the HTTP response comes back [Nat8s] (e.g. [2, 5, 12, 11, 23])
    //public type HttpResponsePayload = {
    //     status : Nat;
    //     headers : [HttpHeader];
    //     body : [Nat8];
    // };
    //We need to decode that [Na8] array that is the body into readable text. 
    //To do this, we:
    //1. Convert the [Nat8] into a Blob
    //2. Use Blob.decodeUtf8() method to convert the Blob to a ?Text optional 
    //3. We use a switch to explicitly call out both cases of decoding the Blob into ?Text
    let response_body: Blob = Blob.fromArray(http_response.body);
    let decoded_text: Text = switch (Text.decodeUtf8(response_body)) {
        case (null) { "No value returned" };
        case (?y) { y };
    };

    //return the decoded text of the body
    decoded_text
  };

};
```

- #### Step 5:  Open the `src/hello_http_backend/Types.mo` file in a text editor and replace content with:

```motoko
module Types {

    //1. Type that describes the Request arguments for an HTTPS outcall
    //See: https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-http_request
    public type HttpRequestArgs = {
        url : Text;
        max_response_bytes : ?Nat64;
        headers : [HttpHeader];
        body : ?[Nat8];
        method : HttpMethod;
        transform : ?TransformRawResponseFunction;
    };

    public type HttpHeader = {
        name : Text;
        value : Text;
    };

    public type HttpMethod = {
        #get;
        #post;
        #head;
    };

    public type HttpResponsePayload = {
        status : Nat;
        headers : [HttpHeader];
        body : [Nat8];
    };

    //2. HTTPS outcalls have an optional "transform" key. These two types help describe it.
    //"The transform function may, for example, transform the body in any way, add or remove headers, 
    //modify headers, etc. "
    //See: https://internetcomputer.org/docs/current/references/ic-interface-spec/#ic-http_request
    

    //2.1 This type describes a function called "TransformRawResponse" used in line 14 above
    //"If provided, the calling canister itself must export this function." 
    //In this minimal example for a GET request, we declare the type for completeness, but 
    //we do not use this function. We will pass "null" to the HTTP request.
    public type TransformRawResponseFunction = {
        function : shared query TransformArgs -> async HttpResponsePayload;
        context : Blob;
    };

    //2.2 This type describes the arguments the transform function needs
    public type TransformArgs = {
        response : HttpResponsePayload;
        context : Blob;
    };


    //3. Declaring the IC management canister which we use to make the HTTPS outcall
    public type IC = actor {
        http_request : HttpRequestArgs -> async HttpResponsePayload;
    };

}
```

- #### Step 6: Test the dapp locally

Deploy the dapp locally:

```bash
dfx start --background
dfx deploy
```

If successful, the terminal should return canister URLs you can open:

```bash
Deployed canisters.
URLs:
  Frontend canister via browser
    hello_http_frontend: http://127.0.0.1:4943/?canisterId=tqtu6-byaaa-aaaaa-aaana-cai
  Backend canister via Candid interface:
    hello_http_backend: http://127.0.0.1:4943/?canisterId=txssk-maaaa-aaaaa-aaanq-cai&id=tzq7c-xqaaa-aaaaa-aaamq-cai
```

Open the candid web UI for the backend (the `hello_http_backend` one) and call the `get_cat_fact` method:

![Candid web UI](../_attachments/https-get-candid-2.webp)

## Rust version
Here is how the management canister is declared in a Rust canister (e.g. `main.rs`):

```rust
//declare the HTTPS outcalls feature of the IC management canister
use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod, HttpResponse, TransformArgs,
    TransformContext,
};

//public method that uses the HTTPS outcalls management canister
async fn foo() {
    //code that uses the management canister
    let request = CanisterHttpRequestArgument {
        //instantiate the request
    };

    //send the http request
    match http_request(request).await {
        Ok((response,)) => {
            //Ok case 
        }
        Err((r, m)) => {
            //error case
        }
    }
}
```

