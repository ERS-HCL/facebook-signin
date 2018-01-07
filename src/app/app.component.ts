import { Component, OnInit } from '@angular/core';
import { FacebookSigninService } from './signin/facebook-signin/facebook-signin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  responseStatus: String;

  constructor(private fbSigininService: FacebookSigninService) {
    this.fbSigininService.fbSigninStatus
      .subscribe(
        response => this.responseStatus = response.status
        // console.log('Facebook Signin Resp::', response)
      );
  }

  ngOnInit() {}
}
