import { Component, OnChanges, OnInit } from '@angular/core';
import { PATH_LOGIN } from "../../../assets/interface/path";
import { AuthService } from "../../_sevices/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit,OnChanges {
  isCollapsed = false;
  path:string | undefined = '';
  constructor(private authService:AuthService,private router:Router) {}
  ngOnInit(): void {
  }
  logout(){
    this.authService.logout();
    this.router.navigate([PATH_LOGIN]);
  }

  ngOnChanges(): void {
  }
}
