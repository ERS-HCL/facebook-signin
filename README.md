Facebook Login component for Angular 5.

[Click to see the demo](https://angular-facebook.stackblitz.io/signin)

# Getting started

Create a developer account in [Facebook Developers](https://developers.facebook.com).

Steps -

1. Log into your developer account
2. Create new Facebook app
3. Choose platform
4. Choose a name
5. Follow Quick Start steps
6. Get App ID

Initialize FB SDK with options. You must replace the value in your-app-id with the ID of your own Facebook App. You can find this ID using the [App Dashboard](https://developers.facebook.com/apps)

```typescript

  const options = {
    appId: '<your-app-id>',
    cookie: true,
    xfbml: false,
    version: 'v2.10',
    status: true
  }

  FB.init(options);
      
```

## Log People in with the Login Dialog from the JavaScript SDK

Calling FB.login() prompts the user to authenticate your app using the Login Dialog. By default, calling FB.login() will attempt to authenticate the user with only the basic permissions. If you want one or more additional permissions, call FB.login() with an option object, and set the scope parameter with a comma-separated list of the permissions you wish to request from the user.

```typescript

    FB.login(function (response) {
       console.log('Get Login Response:: ', response);
       this.statusChangedCallback(response);
    }.bind(this), {
       scope: 'public_profile,email'
    });
      
```
## Handle Login Dialog Response

At this point in the login flow, your app displays the login dialog, which gives people the choice of whether to cancel or to enable the app to access their data. Status specifies the login status of the person using the app.

```typescript

  statusChangedCallback(response) {
    if (response.status === 'connected') {
      // Logged into app and Facebook.
      // Call Graph API
      FB.api('/me', function(response) {
        if (!response || response.error) {
            // console.log('Error occured');
        } else {
          // console.log('Graph Response', response);
        }
      });
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not into the app.
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
    }
  }
  
```

## Call the Graph API

To read or write data to the Graph API use method FB.api(). The version parameter in the FB.init call is used to determine which Graph API version is used.

```typescript

  fbGraphApi() {
    FB.api('/me', function(response) {
      if (!response || response.error) {
          // console.log('Error occured');
      } else {
        // console.log('Graph Response', response);
      }
    });
  }  
```

## Log People Out

You can log people out of your app by attaching the JavaScript SDK function FB.logout to a button or a link, as follows:
Consider the 3 scenarios below:

1. A person logs into Facebook, then logs into your app. Upon logging out from your app, the person is still logged into Facebook.
2. A person logs into your app and into Facebook as part of your app's login flow. Upon logging out from your app, the user is also logged out of Facebook.
3. A person logs into another app and into Facebook as part of the other app's login flow, then logs into your app. Upon logging out from either app, the user is logged out of Facebook.

```typescript

  signOut() {
    FB.logout(function (response) {
      // console.log('Print FB Logout Response:: ', response);
    });
  }
  
```
Note: This function call may also log the person out of Facebook.

## Adding Facebook Signin component in your project

```html

<facebook-signin (status)="onfbSigninStatus($event)"></facebook-signin>

```
Listening to events

```typescript

 onfbSigninStatus(resp) {
   // console.log("Getting Response in AppComp:: ", resp.response);
 }
  
```

