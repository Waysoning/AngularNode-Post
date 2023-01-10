import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(user: Auth) {
    return this.http
      .post('http://localhost:3001/api/user/signup', user)
      .subscribe((res) => console.log(res));
  }
}
