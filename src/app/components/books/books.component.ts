import { Component, OnInit, Input } from "@angular/core";

import { MatSnackBar } from "@angular/material";
import { Book } from "src/app/models/book";

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
  constructor(private _matSnackBar: MatSnackBar) {}

  ngOnInit() {}
  addToCart() {
    this.isAdded = true;
    this.isOutOfStock = true;
    localStorage.getItem("token");
    this.bookService.addToCart().subscribe((response: any) => {
    });
  }
  removeFromCart() {
    this.isAdded = false;
  }
}
