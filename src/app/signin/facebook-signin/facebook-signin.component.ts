import { Component, OnInit } from '@angular/core';
import { FacebookSigninService } from './facebook-signin.service';
import { Router, ActivatedRoute } from '@angular/router';

declare const FB: any;
// declare const window: any;

@Component({
  selector: 'facebook-signin',
  templateUrl: './facebook-signin.component.html',
  styleUrls: ['./facebook-signin.component.css']
})

export class FacebookSigninComponent implements OnInit {


  /**
   * The app ID of your Facebook app. Create one at https://developers.facebook.com/apps/
   */
  appID: String = '1019107491567128'; // '319362775194032'

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

  fbsignedIn: Boolean = false; // notify: true, observer: '_observeSignedIn'

  _is_popup_open: Boolean = false; // observer: '_observePopupOpen'

  constructor(private fbSigininService: FacebookSigninService,
              private router: Router,
              private route: ActivatedRoute) {}

  openPopup() {
    // if (!this._is_popup_open) {
      console.log('Facebook Object', FB);

      const options = {
        appId: this.appID,
        cookie: this.cookie,
        xfbml: false,
        version: this.version
        // status: true
      }

      FB.init(options);

      FB.login(function (response) {
        console.log('Get Login Response:: ', response);
        this._statusChangedCallback(response);
      }.bind(this), {
        scope: this.scope,
        auth_type: 'reauthenticate',
        return_scopes: true,
        enable_profile_selector: true
      });

      // this._is_popup_open = true;
    // }
  }


  _statusChangedCallback(response) {
    if (response.status === 'connected') {
      // Logged into app and Facebook.
      console.log('connected');
      this.fbsignedIn = true;
      this.fbGraphApi();
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

  ngOnInit() {
    const script = `https://connect.facebook.net/${this.language}/sdk.js#xfbml=1&version=${this.version}&appId=${this.appID}`;
    this.fbSigininService._loadScript(script);
  }
}
