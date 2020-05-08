import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';


const routes: Routes = [
  // {
  //     path: "viewCart",
  //     component: ViewCartComponent
  // },
    {
    path:"dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "viewCart",
        component: ViewCartComponent
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
