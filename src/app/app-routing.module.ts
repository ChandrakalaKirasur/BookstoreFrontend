import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ViewCartComponent } from "./components/view-cart/view-cart.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "viewcart",
        component: ViewCartComponent,
      },
      {
        path: "ordersucess",
        component: OrderSuccessComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
