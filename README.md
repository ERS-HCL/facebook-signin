Facebook Login component for Angular 5.

[Click to see the demo](https://angular-facebook.stackblitz.io/signin)

# Getting started

Create a developer account in [Facebook Developers](https://developers.facebook.com).

Initialize FB SDK

```typescript

  const options = {
    appId: '<Your App ID>',
    cookie: true,
    xfbml: false,
    version: 'v2.10'
  }

  FB.init(options);
      
```
FB Login api

```typescript

    FB.login(function (response) {
       console.log('Get Login Response:: ', response);
       this.statusChangedCallback(response);
    }.bind(this), {
       scope: 'public_profile,email'
    });
      
```

Handle status change callback

```typescript

  statusChangedCallback(response) {
    if (response.status === 'connected') {
      // Logged into app and Facebook.
      this.fbGraphApi(); // Call Graph API
      this.status.emit({ response: response });
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not into the app.
      this.status.emit({ response: response });
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      this.status.emit({ response: response });
    }
  }
  
```

FB Graph API

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
FB Signout

```typescript

  signOut() {
    FB.logout(function (response) {
      // console.log('Print FB Logout Response:: ', response);
    });
  }
  
```

  
# Adding Facebook Signin component in your project

```html

<facebook-signin (status)="onfbSigninStatus($event)"></facebook-signin>

```
Listening to events

```typescript

 onfbSigninStatus(resp) {
   // console.log("Getting Response in AppComp:: ", resp.response);
 }
  
```

