import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-view-cart",
  templateUrl: "./view-cart.component.html",
  styleUrls: ["./view-cart.component.scss"],
})
export class ViewCartComponent implements OnInit {
  email = new FormControl("", [Validators.required, Validators.email]);

  emailValidation() {
    return this.email.hasError("required")
      ? ""
      : this.email.hasError("email")
      ? ""
      : "";
  }

  constructor() {}

  ngOnInit() {}

  open: boolean;
  fields: boolean;
  onOpen() {
    this.open = true;
    this.fields = true;
  }

  open2: boolean;
  onOpen2() {
    this.open2 = true;
    this.fields = false;
  }
  onEdit() {
    this.fields = true;
    this.open2 = false;
  }
}
