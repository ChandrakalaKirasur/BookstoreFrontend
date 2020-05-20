import { Component, OnInit, Input } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpService } from "src/app/service/http.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from "@angular/router";
import { Book } from "src/app/models/book";
import { environment } from "src/environments/environment";
import { BookService } from "src/app/service/book.service";
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  data:any;
  constructor(
    private dashboard:DashboardComponent
  ) {}

  ngOnInit() {
    this.dashboard.currentMessage.subscribe(
      response=>{this.data=response,
      console.log(this.data);
      }
    )
  }
}
