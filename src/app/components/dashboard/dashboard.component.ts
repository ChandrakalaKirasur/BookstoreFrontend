import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
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
    colorCode: "rgba(233, 171, 23,1)", name: "Yellow"
    },
    {
    colorCode: "rgba(249, 150, 107,1)", name: "Orange"
    },
    {
    colorCode: "rgba(255,255,255,1)", name: "white"
    },
    {
    colorCode: "rgba(230, 169, 236,1)", name: "Pink"
    },
    ]
  ];
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  onCart() {
    this.router.navigate(["/viewcart"]);
  }
}
