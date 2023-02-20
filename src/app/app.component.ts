import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  isLogin;
  constructor() {
    if(window.location.pathname === "/login"){
      this.isLogin = true;
    }else {
      this.isLogin = false;
    }
  }
}
