import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { UserModel } from '../model/user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken	: string,
  email	: string,
  refreshToken : string,
  expiresIn	: string,
  localId : string,
  registered? : boolean
}

@Injectable({providedIn : 'root'})
export class AuthService {

  URL_SING_UP = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSMqv-us41HLyBO8SOI-ZVsWD8CJy3zbg';
  URL_LOGIN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSMqv-us41HLyBO8SOI-ZVsWD8CJy3zbg';
  user = new BehaviorSubject<UserModel>(null);
  tokenExpirationTimer : any = null;

  constructor(private httpClient : HttpClient, private router : Router) {

  }

  singUp(email : string, password : string) {
    return this.httpClient.post<AuthResponseData>(this.URL_SING_UP,
      {
        email : email,
        password	: password,
        returnSecureToken : true
      }
    )
    .pipe(catchError(
      error => {
        return this.handleError(error);
      }
    ),tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
    }));
  }

  login(login : string, password : string) {
    return this.httpClient.post<AuthResponseData>(this.URL_LOGIN,
      {
        email : login,
        password	: password,
        returnSecureToken : true
      }
    )
    .pipe(catchError(
      error => {
        return this.handleError(error);
      }
    ),tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
    }));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');

    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogin() {
    const userData :
    {
      email : string,
      id: string,
      _token: string,
      _tokenExpirationDate: string} = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const userLoaded = new UserModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if(userLoaded.token) {
      this.user.next(userLoaded);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }

  }

  autoLogout(expirationDuration : number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes : HttpErrorResponse) {
    let errorMsg = 'An unknown error acourred!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMsg);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS' :
            errorMsg = 'This email exists already!';
            break;
          case 'EMAIL_NOT_FOUND' :
            errorMsg = 'Email not found!';
            break;
          case 'INVALID_PASSWORD' :
            errorMsg = 'Invalid email or password';
            break;
          case 'USER_DISABLED' :
            errorMsg = 'User disabled!';
            break;
        }
        return throwError(errorMsg);
  }

  private handleAuthentication (email : string, userId : string, token : string, expiresIn : string ){
    const expirationDate = new Date(new Date().getTime() + Number(expiresIn) * 1000);
    const user = new UserModel(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

}
