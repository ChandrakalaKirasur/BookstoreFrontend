import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-whishlist",
  templateUrl: "./whishlist.component.html",
  styleUrls: ["./whishlist.component.scss"],
})
export class WhishlistComponent implements OnInit {
  images = [{}, {}, {}, {}];
  constructor() {}

  ngOnInit() {}
}
