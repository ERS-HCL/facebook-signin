import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FacebookSigninService } from './facebook-signin.service';

declare const FB: any;

@Component({
  selector: 'facebook-signin',
  templateUrl: './facebook-signin.component.html',
  styleUrls: ['./facebook-signin.component.css']
})

export class FacebookSigninComponent implements OnInit {


  /**
   * The app ID of your Facebook app. Create one at https://developers.facebook.com/apps/
   */
  appID: String = '<your_app_id>';

  /**
   * Whether you want to set a cookie in order to allow the server to access the session.
   */
  cookie: Boolean = true;

  /**
   * The `version` attribute specifies which FB API version should be used. Example 'v2.10'.
   */
  version: String = 'v2.10';

  /**
   * The language of the sdk.
   */
  language: String = 'en_IN';

  /**
   * The scope that you want access to.
   * (see https://developers.facebook.com/docs/facebook-login/permissions/v2.10). Should be space delimited.
   */
  scope: String = 'public_profile,email';

  @Output() status = new EventEmitter<any>();

  constructor(private fbSigininService: FacebookSigninService) {}

  openPopup() {

      const options = {
        appId: this.appID,
        cookie: this.cookie,
        xfbml: false,
        version: this.version
      }

      FB.init(options);

      FB.login(function (response) {
        // console.log('Get Login Response:: ', response);
        this._statusChangedCallback(response);
      }.bind(this), {
        scope: this.scope,
        auth_type: 'reauthenticate'
      });
  }


  _statusChangedCallback(response) {
    if (response.status === 'connected') {
      // Logged into app and Facebook.
      // console.log('connected');
      this.fbGraphApi();
      this.status.emit({ response: response });
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not into the app.
      // console.log('Not Authorized');
      this.status.emit({ response: response });
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      // console.log('User not signed in');
      this.status.emit({ response: response });
    }
  }

  fbGraphApi() {
    FB.api('/me', function(response) {
      if (!response || response.error) {
          console.log('Error occured');
      } else {
        console.log('Graph Response', response);
        this.status.emit({ response: response });      
      }
    });
  }

  ngOnInit() {
    const script = `https://connect.facebook.net/${this.language}/sdk.js#xfbml=1&version=${this.version}&appId=${this.appID}`;
    this.fbSigininService._loadScript(script);
  }
}
