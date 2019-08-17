import { Component, OnInit } from '@angular/core';

declare const gapi: any;

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  public auth2: any;

  ngOnInit() {
    console.log("ngOnInit()");
    (window as any).onSignIn = this.onSignIn;
  }

  constructor() {
    gapi.load('auth2', function () {
      gapi.auth2.init()
      console.log("gapi init()");
    });
  }

  onSignIn(googleUser) {
    console.log("googleLogin");
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    let googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.then(() => {
      googleAuth.signIn({ scope: 'profile email' }).then(googleUser => {
        console.log(googleUser.getBasicProfile());
        console.log(googleUser.getAuthResponse().id_token);
      });
    });
  }


}
