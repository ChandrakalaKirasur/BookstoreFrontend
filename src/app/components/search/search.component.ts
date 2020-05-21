import { Component, OnInit, Input } from "@angular/core";
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  data: any;
  constructor(private dashboard: DashboardComponent) {}

  ngOnInit() {
    this.dashboard.currentMessage.subscribe((response) => {
      (this.data = response), console.log(this.data);
    });
  }
}
