Angular 5 Facebook Login
Facebook Login component for Angular 5.

[Click to see the demo](https://angular-facebook.stackblitz.io/signin)

# Getting started

Create a developer account in [Facebook Developers](https://developers.facebook.com).


```typescript

export class FacebookSigninComponent {

  openFBLoginPopup() {
      const options = {
        appId: '<Your App ID>',
        cookie: true,
        xfbml: false,
        version: 'v2.10'
      }

      FB.init(options);

      FB.login(function (response) {
        console.log('Get Login Response:: ', response);
        this.statusChangedCallback(response);
      }.bind(this), {
        scope: 'public_profile,email',
        auth_type: 'reauthenticate'
      });
  }
  
  statusChangedCallback(response) {
    if (response.status === 'connected') {
      // Logged into app and Facebook.
      console.log('connected');
      this.fbsignedIn = true;
      this.fbGraphApi(); // Call Graph API
      this.fbSigininService.updateFbSigninStatus(response); 
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not into the app.
      console.log('Not Authorized');
      this.fbsignedIn = false;
      this.fbSigininService.updateFbSigninStatus(response);
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log('User not signed in');
      this.fbsignedIn = false;
      this.fbSigininService.updateFbSigninStatus(response);
    }
  }

  fbGraphApi() {
    FB.api('/me', function(response) {
      if (!response || response.error) {
          console.log('Error occured');
      } else {
        console.log('Graph Response', response);
      }
    });
  }
  
  signOut() {
    /* NOTE:
    1. A person logs into Facebook, then logs into your app. Upon logging out from your app,
       the person is still logged into Facebook.
    2. A person logs into your app and into Facebook as part of your app's login flow.
       Upon logging out from your app, the user is also logged out of Facebook.
    3. A person logs into another app and into Facebook as part of the other app's login flow,
       then logs into your app. Upon logging out from either app, the user is logged out of Facebook.
    */
    FB.logout(function (response) {
      // console.log('Print FB Logout Response:: ', response);
    });
  }
  
}  
 ```
  
# Installing dependencies and serve project  

$ npm install

$ ng serve
