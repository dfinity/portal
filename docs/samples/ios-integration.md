# IOS Integration

[IOS Integration](https://github.com/dfinity/examples/tree/master/motoko/ios-notifications) is an experimental dapp with a native app integration that showcases a possible solution for integrating a DApp hosted in the Internet Computer with multiple platforms, for this example we've created an iOS app.

## Idea

We aimed to create an example of a simple integration of a dapp running purely on the IC and is using [Internet Identity](/docs/current/references/ii-spec) with a native iOS application that can let the user have a native feel such as authenticating and receive push notifications.

## Approach

The basic functionality of the IOS Integration consists of four main components. 

First, we created a dapp that is integrated with [Internet Identity](/docs/current/references/ii-spec) and has a basic routing functionality. While the user is not authenticated it can only see the login page and when authenticated can navigate between the about and home page.

Second, we created a new ios native application that serves as a wrapper for the dapp and creates a native feel for the user.

Third, a proxy page was added in the dapp to enable the user to securely authenticate using [Internet Identity](/docs/current/references/ii-spec) and keep the authenticated session in the webview until it expires, even when the user exits the app and re-opens it the session persists.

Fourth, the app is configurated to receive push notifications from the system and open a speficied url, this allows for notifications to be sent serving as a mechanism to deeplink into a specific section of the dapp. 

For further details, please refer to the [README file](https://github.com/dfinity/examples/blob/master/motoko/ios-notifications/README.md).
