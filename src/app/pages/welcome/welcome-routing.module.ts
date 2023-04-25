import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { AppLayoutComponent } from "./app-layout/app-layout.component";

const routes: Routes = [
  { path: '', component: WelcomeComponent,children:[
      {path:'product',component:AppLayoutComponent}
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
