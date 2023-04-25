import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from "../../../_sevices/auth/auth.service";
import { Router } from "@angular/router";
import { PATH_LOGIN } from "../../../../assets/interface/path";
import { TemplateElement } from "@angular/compiler-cli/src/ngtsc/translator";

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  isCollapsed = false;
  @Input() element!:TemplateElement;
  constructor(private authService:AuthService,private router:Router) {

  }
  ngOnInit(): void {

  }
  logout(){
    this.authService.logout();
    this.router.navigate([PATH_LOGIN]);
  }
}
