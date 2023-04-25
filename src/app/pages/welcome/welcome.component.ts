import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  ngOnInit(): void {
  }
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
