import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from "@angular/material";
import { AddressService } from "src/app/service/address.service";

@Component({
  selector: "app-whishlist",
  templateUrl: "./whishlist.component.html",
  styleUrls: ["./whishlist.component.scss"],
})
export class WhishlistComponent implements OnInit {
  images = [{}, {}, {}, {}];
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    // private cartService: ViewcartService,
    private addressService: AddressService
  ) {}

  ngOnInit() {
    this.onwhishlist();
  }

  //   ongetwhistlist{
  //   this.addressService
  //     .postRequest("address/add/" + this.token, this.address)
  //     .subscribe((Response: any) => { });
  // }
  token: String;
  books: [];
  onwhishlist() {
    this.token = localStorage.getItem("token");
    this.addressService
      .getRequest("whishList/books_cart/" + this.token)
      .subscribe(
        (Response: any) => {
          if (Response.statusCode === 200) {
            // this.addressService.changeMessage('trash')
            this.books = Response.obj;
            console.log(this.books);
            this.snackbar.open("WhishList", "undo", { duration: 2500 });
          } else {
            console.log(Response);
            this.books = Response.obj;
            console.log(this.books);
            this.snackbar.open("whishList unSuccessfull", "undo", {
              duration: 2500,
            });
          }
        },
        (error: any) => {
          console.error(error);
          console.log(error.error.message);
          this.snackbar.open(error.error.message, "undo", { duration: 2500 });
        }
      );
  }

  onRemove(book: any) {
    console.log(book);
    this.token = localStorage.getItem("token");
    this.addressService
      .deleteRequest(
        "whishList/remove_books_WhishList/" +
          this.token +
          "?bookId=" +
          book.bookId,
        ""
      )
      .subscribe(
        (Response: any) => {
          if (Response.statusCode === 200) {
            // this.addressService.changeMessage('trash')
            this.books = Response.obj;
            console.log(this.books);
            this.snackbar.open("WhishList", "undo", { duration: 2500 });
          } else {
            console.log(Response);
            this.books = Response.obj;
            console.log(this.books);
            this.snackbar.open("whishList unSuccessfull", "undo", {
              duration: 2500,
            });
          }
        },
        (error: any) => {
          console.error(error);
          console.log(error.error.message);
          this.snackbar.open(error.error.message, "undo", { duration: 2500 });
        }
      );
  }
}
