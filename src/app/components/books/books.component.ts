import { Component, OnInit, Input } from "@angular/core";

import { MatSnackBar } from "@angular/material";
import { Book } from "src/app/models/book";
import { Router } from "@angular/router";
import { BookService } from "src/app/service/book.service";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"],
})
export class BooksComponent implements OnInit {
  @Input() book: Book;
  isAdded: boolean = false;
  isOutOfStock: boolean = false;
  isLessThanFive: boolean = false;
  constructor(
    private _matSnackBar: MatSnackBar,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit() {}
  addToCart() {
    this.isOutOfStock = true;
    let token = localStorage.getItem("token");
    if (!(token == "")) {
      this.isAdded = true;
      console.log("token:",token);
      this.bookService
        .addToCart(this.book.bookId)
        .subscribe((response: any) => {
          console.log(response["obj"]);
        });
    } else {
      this._matSnackBar.open("please login", "ok", {
        duration: 5000,
      });
      this.router.navigateByUrl("/login");
    }
  }
  removeFromCart() {
    this.isAdded = false;
  }
}
