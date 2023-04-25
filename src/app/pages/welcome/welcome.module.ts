import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzPopoverModule } from "ng-zorro-antd/popover";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { NzMessageModule } from "ng-zorro-antd/message";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzAutocompleteModule } from "ng-zorro-antd/auto-complete";
import { NgChartsModule } from "ng2-charts";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzIconModule } from "ng-zorro-antd/icon";
import { StatisticalComponent } from "./statistical/statistical.component";
import { AppLayoutComponent } from "./app-layout/app-layout.component";
import { BrandComponent } from "./brand/brand.component";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "./product/product.component";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { DetailProductComponent } from "./product/detail-product/detail-product.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [WelcomeRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
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
    NzToolTipModule, NzIconModule],
  declarations: [WelcomeComponent,
    StatisticalComponent,
    AppLayoutComponent,
    BrandComponent,
    ProductComponent,
    AddProductComponent,
    DetailProductComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
