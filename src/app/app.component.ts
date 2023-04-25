import { Component } from '@angular/core';
import { LoadingService } from "./_sevices/loading/loading.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  isLogin;
  isLoading! : boolean ;
  constructor(private loadingService:LoadingService) {
    this.loadingService.isLoading.subscribe(res => {
      this.isLoading = res;
    })
    if(window.location.pathname === "/login"){
      this.isLogin = true;
    }else {
      this.isLogin = false;
    }
  }
}
