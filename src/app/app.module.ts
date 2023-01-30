import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DetailReceivedComponent } from "./pages/received/detail-received/detail-received.component";
import { AddProductComponent } from "./pages/product/add-product/add-product.component";
import { DetailProductComponent } from "./pages/product/detail-product/detail-product.component";
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { BrandComponent } from "./pages/brand/brand.component";
import { StatisticalComponent } from "./pages/statistical/statistical.component";
import { NgChartsModule } from 'ng2-charts';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ReceivedComponent,
    ProductComponent,
    SaleComponent,
    LoadingComponent,
    DetailReceivedComponent,
    AddProductComponent,
    DetailProductComponent,
    BrandComponent,
    StatisticalComponent
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
    NgChartsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
