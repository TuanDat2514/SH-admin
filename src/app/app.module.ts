import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ReceivedComponent } from "./pages/received/received.component";
import { ProductComponent } from "./pages/product/product.component";
import { NzTagModule } from 'ng-zorro-antd/tag';
import { SaleComponent } from "./pages/sale/sale.component";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { LoadingComponent } from "./loading/loading.component";
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from "ng-zorro-antd/input";
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ReceivedComponent,
    ProductComponent,
    SaleComponent,
    LoadingComponent
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
    NzDrawerModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
