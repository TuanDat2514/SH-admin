import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authenticationService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (this.authenticationService.isUserLoggedIn() &&
      req.url.indexOf('auth') === -1) {
      console.log(this.authenticationService.id)
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': String(JSON.stringify(localStorage.getItem("token"))),
        })
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
