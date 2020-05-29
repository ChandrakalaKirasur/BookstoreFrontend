import { Component, OnInit, Input } from "@angular/core";

import { MatSnackBar } from "@angular/material";
import { Book } from "src/app/models/book";
import { Router } from "@angular/router";
import { BookService } from "src/app/service/book.service";
import { environment } from "src/environments/environment";
import { ViewcartService } from "src/app/service/viewcart.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"],
})
export class BooksComponent implements OnInit {
  @Input() book: Book;
  noOfBooks: number;
  visible: boolean;
  getCount: boolean = false;
  @Input("starCount") private starCount: number = 5;
  private ratingArr = [];
  constructor(
    private _matSnackBar: MatSnackBar,
    private router: Router,
    private bookService: BookService,
    private cartService: ViewcartService
  ) {}
  ngOnInit() {
    this.noOfBooks = this.book.noOfBooks;
    if (localStorage.getItem("token") != null) {
      this.visible = true;
      this.isAddedToCart();
      this.isAddedToWishList();
      // this.getcountofbooks();
    }
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  addToCart() {
    if (this.visible) {
      this.bookService
        .addToCart(this.book.bookId)
        .subscribe((response: any) => {
          console.log(response["obj"]);
          this.book.isAdded = response.obj;
          // this.getCount = response.obj;
          this._matSnackBar.open("Book added to cart", "ok", {
            duration: 1000,
          });
          // if (this.getCount) {
          // this.getcountofbooks();
          // }
        });
    } else {
      this._matSnackBar.open("please login", "ok", {
        duration: 1000,
      });
      this.router.navigateByUrl("/login");
    }
  }
  //adding book to wish list if user login
  addToWishlist() {
    if (this.visible) {
      this.bookService
        .addToWishList(this.book.bookId)
        .subscribe((response: any) => {
          console.log(response["obj"]);
          this.book.isListed = response["obj"];
          this._matSnackBar.open("Book added to wishlist", "ok", {
            duration: 1000,
          });
        });
    } else {
      this._matSnackBar.open("please login", "ok", {
        duration: 2000,
      });
      this.router.navigateByUrl("/login");
    }
  }
  //getting boolean as a output and finding whether book is already in cart
  isAddedToCart() {
    this.bookService
      .isAddedTocart(this.book.bookId)
      .subscribe((response: any) => {
        this.book.isAdded = response["obj"];
      });
  }
  isAddedToWishList() {
    this.bookService
      .isAddedToWishList(this.book.bookId)
      .subscribe((response: any) => {
        this.book.isListed = response["obj"];
      });
  }
  @Input("rating") private rating: number = 4;
  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return "star";
    } else {
      return "star_border";
    }
  }
  // appName: string;
  // token: string;
  // private bookcount = new BehaviorSubject<number>(0);
  // countMessage = this.bookcount.asObservable();
  // getcountofbooks() {
  // this.appName = "Dashboard";
  // this.token = localStorage.getItem("token");
  // this.cartService
  // .getRequest(environment.book_count_cart)
  // .subscribe((response: any) => {
  // this.bookcount.next(response.obj);
  // });
  // }
  private bookrating = new BehaviorSubject<any>(this.book);
  ratingBookMessage = this.bookrating.asObservable();
  ratingAndReviews(book: any) {
    this.bookrating.next(book);
    //this.router.navigate(["books/orderdetails/rating"]);
  }
}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn",
}
