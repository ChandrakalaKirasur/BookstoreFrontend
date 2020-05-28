import { Component, OnInit, Input, Output } from "@angular/core";
import { EventEmitter } from "events";
import { MatSnackBar } from "@angular/material";
import { BooksComponent } from "../books/books.component";
import { Book } from "src/app/models/book";

@Component({
  selector: "app-giverate",
  templateUrl: "./giverate.component.html",
  styleUrls: ["./giverate.component.scss"],
})
export class GiverateComponent implements OnInit {
  data: Book;
  @Input("starCount") private starCount: number = 5;
  @Input("color") private color: string;
  private snackBarDuration: number = 2000;
  private ratingArr = [];
  rating: number;
  @Output() private ratingUpdated = new EventEmitter();
  constructor(private snackBar: MatSnackBar, private books: BooksComponent) {}
  ngOnInit() {
    this.books.ratingBookMessage.subscribe((response) => {
      (this.data = response), console.log(response.noOfBooks);
    });
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
}
