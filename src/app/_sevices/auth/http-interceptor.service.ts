import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import {Router} from "@angular/router";
import {PATH_LOGIN} from "../../../assets/interface/path";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authenticationService: AuthService,private router : Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (this.authenticationService.isUserLoggedIn() &&
      req.url.indexOf('auth') === -1) {
      console.log(this.authenticationService.id)
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token') as string,
        })
      });
      return next.handle(authReq);
    } else {
      this.router.navigate([PATH_LOGIN])
      return next.handle(req);
    }
  }
}
