import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error : string = null;
  registered? : boolean;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(ngForm : NgForm) {
    if (!ngForm.valid) {
      return;
    }
    const login = ngForm.value.login;
    const password = ngForm.value.password;
    this.isLoading = true;

    let authObs : Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(login, password);
    } else {
      authObs = this.authService.singUp(login, password);
    }

    authObs.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.registered = responseData.registered;
      },
      error => {
        this.error = error;
        this.isLoading = false;
      }
    );

    ngForm.reset();
  }
}
