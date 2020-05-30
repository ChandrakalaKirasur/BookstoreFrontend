import { Component, OnInit, Input, Output } from "@angular/core";
import { EventEmitter } from "events";
import { MatSnackBar } from "@angular/material";
import { BooksComponent } from "../books/books.component";
import { Book } from "src/app/models/book";
import { BookService } from "src/app/service/book.service";

@Component({
  selector: "app-giverate",
  templateUrl: "./giverate.component.html",
  styleUrls: ["./giverate.component.scss"],
})
export class GiverateComponent implements OnInit {
  @Input("starCount") private starCount: number = 5;
  @Input("color") private color: string;
  private snackBarDuration: number = 2000;
  private ratingArr = [];
  rating: number;
  book: Book;
  bookId: any;
  constructor(
    private snackBar: MatSnackBar,
    private bookService: BookService
  ) {}
  ngOnInit() {
    this.bookId = localStorage.getItem("bookId");
    this.getBookById();
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating: any) {
    console.log(rating);
    this.snackBar.open("You rated " + rating + " / " + this.starCount, "", {
      duration: this.snackBarDuration,
    });
    this.rating = rating;
    return false;
  }
  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return "star";
    } else {
      return "star_border";
    }
  }
  getBookById() {
    this.bookService.getBookById(this.bookId).subscribe((response: any) => {
      this.book = response["obj"];
    });
  }
}
