import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { LoadingComponent } from "./pages/welcome/loading/loading.component";
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from "ng-zorro-antd/input";
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NgChartsModule } from 'ng2-charts';
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { LoginComponent } from "./pages/login/login.component";
import { LoadingGlobalComponent } from "./loading-global/loading-global.component";
import { HttpInterceptorService } from "./_sevices/auth/http-interceptor.service";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingGlobalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzTagModule,
    NzButtonModule,
    NzModalModule,
    NzPopconfirmModule,
    NzSpinModule,
    NzAlertModule,
    NzInputNumberModule,
    NzInputModule,
    NzDrawerModule,
    NzPopoverModule,
    NzUploadModule,
    NzMessageModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzAutocompleteModule,
    NgChartsModule,
    NzToolTipModule
  ],
  /*providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],*/
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
