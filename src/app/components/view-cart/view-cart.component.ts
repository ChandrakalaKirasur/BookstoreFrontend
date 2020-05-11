import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-view-cart",
  templateUrl: "./view-cart.component.html",
  styleUrls: ["./view-cart.component.scss"],
})
export class ViewCartComponent implements OnInit {
  images = [
    [
      {
        // colorCode: "rgba(198, 222, 255,1)",
        // name: "Blue",
        img: "dontmake.png",
      },
      {
        img: "dontmake.png",
      },
      {
        img: "dontmake.png",
      },
      {
        img: "dontmake.png",
      },
    ],
  ];
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
