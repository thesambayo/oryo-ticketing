import { Injectable } from '@angular/core';
import { LoginPayload } from '../model/login-item';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl = environment
  constructor(
    private _http: HttpClient,
  ) { }
  login(data: LoginPayload) {
    // authenticate user and save user data
    let url = `${this.baseUrl}/auth/login`;
    return this._http.post<any>(url, data).pipe();
    // TODO: implement proper authentication and user storage
  }
  saveUser(user:LoginPayload) {
    // save user to local storage
    example: localStorage.setItem('user', JSON.stringify(user))
    // TODO: implement proper user storage

  }
}
