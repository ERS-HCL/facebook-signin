Angular 5 Facebook Login
Facebook Login component for Angular 5.

[Click to see the demo](https://angular-facebook.stackblitz.io/signin)

# Getting started

Create a developer account in [Facebook Developers](https://developers.facebook.com).


```typescript
import { Component, OnInit, EventEmitter } from '@angular/core';

declare const FB: any;

@Component({
  ...
})
export class FacebookSigninComponent implements OnInit {

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
        this._statusChangedCallback(response);
      }.bind(this), {
        scope: 'public_profile,email',
        auth_type: 'reauthenticate'
      });
  }
  
  _statusChangedCallback(response) {
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
    FB.logout(function (response) {
      // console.log('Print FB Logout Response:: ', response);
    });
  }

  _loadScript(src) {
      ...
  }  
  
  ngOnInit() {
    const script = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=<Your App ID>`;
    this._loadScript(script);
  }
}  
 ```
  
# Installing dependencies and serve project  

$ npm install

$ ng serve
