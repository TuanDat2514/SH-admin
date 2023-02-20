import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  repeatPassword:string = "";
  constructor() {
  }

  ngOnInit(): void {
  }

  login(){
    console.log({username:this.username,password:this.password});
  }

  register(){
    console.log({username:this.username,password:this.password,repeatPassword:this.repeatPassword});
  }

  resetPassword(){
    console.log({username:this.username});
  }
}
