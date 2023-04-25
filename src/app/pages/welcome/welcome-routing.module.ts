import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { AppLayoutComponent } from "./app-layout/app-layout.component";
import { ProductComponent } from "./product/product.component";
import { StatisticalComponent } from "./statistical/statistical.component";
import { BrandComponent } from "./brand/brand.component";
import { ReceivedComponent } from "./received/received.component";

const routes: Routes = [
  {
    path: '', component: WelcomeComponent, children: [
      { path: 'product', component: ProductComponent },
      { path: 'statistical', component: StatisticalComponent },
      { path: 'brand', component: BrandComponent },
      { path: 'received', component: ReceivedComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule {
}
