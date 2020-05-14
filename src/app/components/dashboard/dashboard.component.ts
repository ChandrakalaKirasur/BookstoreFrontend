import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { HttpService } from "src/app/service/http.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private httpservice: HttpService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  visible: boolean;
  ngOnInit() {
    if (localStorage.getItem("token") != null) {
      this.visible = true;
    }
  }
  myInput = new FormControl();
  private obtainNotes = new BehaviorSubject([]);

  onBook() {
    this.router.navigate(["books"]);
  }
  showSpinner = false;
  onCart() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(["books/viewcart"]);
    }, 1000);
  }
  onwhishlist() {
    this.router.navigate(["books/whishlist"]);
  }
  onOrderDetails() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(["books/orderdetails"]);
    }, 1000);
  }
  onLogin() {
    this.router.navigate(["login"]);
  }
  onLogout() {
    localStorage.clear();
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(["books"]);
    }, 1000);
  }
  searching() {
    console.log(this.myInput.value);
    this.httpservice
      .getSearchRequest(
        "book/getBookByNameAndAuthor?title=" + this.myInput.value
      )
      .subscribe((response: any) => {
        this.obtainNotes.next(response);
        console.log(response);
        this.router.navigate(["login"]);
      });
  }
}
