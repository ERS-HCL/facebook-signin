Angular 5 Facebook Login
Facebook Login component for Angular 5.

# Getting started
Install via npm
npm install
Import the module
In your AppModule, import the SocialLoginModule

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("Facebook-App-Id")
  }
]);

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    SocialLoginModule.initialize(config)
  ],
  providers: [],
  bootstrap: [...]
})
export class AppModule { }
Sign in and out users
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor(private authService: AuthService) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

}
Subscribe to the authentication state
You are notified when user logs in or logs out. You receive a SocialUser object when the user logs in and a null when the user logs out. SocialUser object contains basic user information such as name, email, photo URL, etc.

import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

}
Display the user information
<img src="{{ user.photoUrl }}">
<div>
  <h4>{{ user.name }}</h4>
  <p>{{ user.email }}</p>
</div>
Building with AoT
If you are facing issue in building your app with AoT, check this document.

Running the demo app
cd demo
npm install
ng serve
