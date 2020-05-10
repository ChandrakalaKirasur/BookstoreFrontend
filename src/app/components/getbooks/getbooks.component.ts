import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-getbooks",
  templateUrl: "./getbooks.component.html",
  styleUrls: ["./getbooks.component.scss"],
})
export class GetbooksComponent implements OnInit {
  sort: any = "Sort by relevance";
  sortTech1: any = "Price:Low to High";
  images = [
    [
      {
        colorCode: "rgba(198, 222, 255,1)",
        name: "Blue",
      },
      {
        colorCode: "rgba(229, 228, 226,1)",
        name: "Gray",
      },
      {
        colorCode: "rgba(230, 169, 236,1)",
        name: "Pink",
      },
      {
        colorCode: "rgba(230, 169, 236,1)",
        name: "Pink",
      },
    ],
    [
      {
        colorCode: "rgba(233, 171, 23,1)",
        name: "Yellow",
      },
      {
        colorCode: "rgba(249, 150, 107,1)",
        name: "Orange",
      },
      {
        colorCode: "rgba(255,255,255,1)",
        name: "white",
      },
      {
        colorCode: "rgba(230, 169, 236,1)",
        name: "Pink",
      },
    ],
  ];
  constructor() {}

  ngOnInit() {
    this.sort;
  }
  sortByLowToHigh() {
    this.sort = this.sortTech1;
    this.sortTech1 = this.sort;
  }
  sortByHighToLow() {}
  sortByNewArrivals() {}
  doSorting(option:any) {
    if (this.sort == "Sort by relevance") {
      this.sort = option;
      this.sortTech1 = "Sort by relevance";
    }
    if (this.sort == "Price:Low to High") {
      this.sort = this.sortTech1;
      this.sortTech1 = "Price:Low to High";
    }
    if (this.sort == "Sort by relevance") {
      this.sort = this.sortTech1;
      this.sortTech1 = this.sort;
    }
    if (this.sort == "Sort by relevance") {
      this.sort = this.sortTech1;
      this.sortTech1 = this.sort;
    }
  }
}
