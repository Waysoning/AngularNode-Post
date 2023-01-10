import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;

  getToken() {
    return this.token;
  }

  constructor(private http: HttpClient) {}

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
      });
  }
}
