import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ViewCartComponent } from "./components/view-cart/view-cart.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";
import { GetbooksComponent } from "./components/getbooks/getbooks.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { ForgetpasswordComponent } from "./components/forgetpassword/forgetpassword.component";
import { RestpasswordComponent } from "./components/restpassword/restpassword.component";
import { AuthGuardService } from "./service/guards/auth-guard.service";
import { WhishlistComponent } from "./components/whishlist/whishlist.component";

const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "forgetpassword",
    component: ForgetpasswordComponent,
  },
  {
    path: "resetpassword",
    component: RestpasswordComponent,
  },
  {
    path: "",
    component: DashboardComponent,
    // canActivateChild: [AuthGuardService],
    children: [
      { path: "", redirectTo: "/books", pathMatch: "full" },
      { path: "books", component: GetbooksComponent },
      {
        path: "viewcart",
        component: ViewCartComponent,
      },
      {
        path: "ordersucess",
        component: OrderSuccessComponent,
      },
      {
        path: "whishlist",
        component: WhishlistComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
