import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getIsAuth() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  registerUser(user: Auth) {
    return this.http
      .post('http://localhost:3001/api/user/signup', user)
      .subscribe((res) => console.log(res));
  }

  loginUser(user: Auth) {
    this.http
      .post<{ token: string }>('http://localhost:3001/api/user/login', user)
      .subscribe((res) => {
        this.token = res.token;
        if (this.token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
        }
      });
  }
}
