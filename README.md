Angular 5 Facebook Login
Facebook Login component for Angular 5.

[Click to see the demo](https://angular-facebook.stackblitz.io/signin)

# Getting started

```javascript
  openPopup() {
      const options = {
        appId: this.appID,
        cookie: this.cookie,
        xfbml: false,
        version: this.version
      }

      FB.init(options);

      FB.login(function (response) {
        console.log('Get Login Response:: ', response);
        this.statusChangedCallback(response);
      }.bind(this), {
        scope: this.scope,
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
    // this._is_popup_open = false;
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
 ```
  
# Installing dependencies and serve project  

npm install
ng serve
