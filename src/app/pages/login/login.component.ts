import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../_sevices/auth/auth.service";
import { LoginBody } from "../../../assets/interface/interface";
import { LoadingService } from "../../_sevices/loading/loading.service";
import { Router } from "@angular/router";
import { PATH_DASHBOARD } from "../../../assets/interface/path";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  repeatPassword: string = "";
  message!: string;
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private loadingService: LoadingService, private route: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.loadingService.showLoading();
    console.log(this.loadingService.isLoading);
    if (this.loginForm.controls['username'].errors) {
      this.message = "Tài khoản là bắt buộc";
    } else if (this.loginForm.controls['password'].errors) {
      this.message = "Mật khẩu là bắt buộc";
    } else {
      this.message = "";
        this.authService.login(this.loginForm.value as LoginBody).subscribe((res) => {
          if (res.success) {
            this.route.navigate([PATH_DASHBOARD]);
            this.authService.registerSuccessfulLogin(this.loginForm.value.username as string);
            this.authService.username = this.loginForm.value.username;
            this.authService.password = this.loginForm.value.password;
            localStorage.setItem("token",this.authService.createBasicAuthToken());
            this.authService.createBasicAuthToken();
          } else {
            this.message = res.message as string ;
          }
          this.loadingService.hideLoading();
        })

    }

  }

  register() {

  }

  resetPassword() {

  }
}
