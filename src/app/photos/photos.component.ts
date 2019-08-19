import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError, Subscription, timer } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { Album } from './album';

declare const gapi: any;

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  public auth2: any;

  private access_token: any;

  albums: Album[];


  ngOnInit() {
  
  }

  ngAfterViewInit() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile https://www.googleapis.com/auth/photoslibrary.readonly',
      'longtitle': true,
      'theme': 'light',
      'onsuccess': param => this.onSignIn(param)
    });
  }

  constructor(private cdRef: ChangeDetectorRef, private http: HttpClient) {
    gapi.load('auth2', function () {
      gapi.auth2.init();
    });
  }

  onSignIn(googleUser: any) {
    console.log("googleLogin");
    let googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.then(() => {
      googleAuth.signIn({ scope: 'profile email' }).then(googleUser => {
        console.log(googleUser.getBasicProfile());
        this.access_token = googleUser.getAuthResponse().access_token;
        console.log(this.access_token);
        this.getAlbums();
      });
    });
  }

  getAlbums() {
    console.log("In GetAlbums");
    const url: string = "https://photoslibrary.googleapis.com/v1/albums";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.access_token
      })
    };
    this.http.get<Album[]>(url, httpOptions)
      .subscribe(
        (data) => {
          this.albums = data && data["albums"];
          console.log(JSON.stringify(data));
          this.cdRef.detectChanges();
        }
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


}
