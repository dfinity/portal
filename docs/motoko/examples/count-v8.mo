import Debug "mo:base/Debug";
import Float "mo:base/Float";
import {migration} "Migration";

(with migration) // declare the migration function (using field punning)
persistent actor
  Counter_v8 {

  var state : Float = 0.0; // implicitly `stable`

  public func increment() : async () {
    state += 0.5;
  };

  public func decrement() : async () {
    state -= 0.5;
  };

  public query func read() : async Int {
    Debug.trap("No longer supported: Use `readFloat`");
  };

  public query func readFloat() : async Float {
    return state;
  };
};
