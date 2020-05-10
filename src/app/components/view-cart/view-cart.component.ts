import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-view-cart",
  templateUrl: "./view-cart.component.html",
  styleUrls: ["./view-cart.component.scss"],
})
export class ViewCartComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  open: boolean;
  onOpen() {
    this.open = true;
  }

  open2: boolean;
  onOpen2() {
    this.open2 = true;
  }
}
