import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { LoginBody, LoginResponse } from "../../../assets/interface/interface";
import { PARAM, URL_ROOT } from "../../../assets/param";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_NAME_SESSION = 'username_session'
  ID_USER = 'id_user'
  public username: any;
  public password: any;
  public id: any;
  results!: string[];
  constructor(private http: HttpClient) {
  }

  login(loginBody: LoginBody): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${URL_ROOT}/${PARAM.LOGIN}`, loginBody);
  }

  createBasicAuthToken() {
    console.log( 'Basic ' + window.btoa(this.username + ":" + this.password));
    return 'Basic ' + window.btoa(this.username + ":" + this.password)
  }

  registerSuccessfulLogin(username: string) {
    localStorage.setItem(this.USER_NAME_SESSION, username)
  }

  SetID(id: string) {
    localStorage.setItem(this.ID_USER, id)
  }

  logout() {
    localStorage.clear();
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = localStorage.getItem(this.USER_NAME_SESSION)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = localStorage.getItem(this.USER_NAME_SESSION)
    if (user === null) return ''
    return user
  }
}
