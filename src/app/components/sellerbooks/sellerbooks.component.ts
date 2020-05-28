import { Component, OnInit } from "@angular/core";
import { BookService } from "src/app/service/book.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Book } from "src/app/models/book";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { AddbookComponent } from "../addbook/addbook.component";
import { ViewserviceService } from "src/app/service/viewservice.service";
import { DataserviceService } from "src/app/service/dataservice.service";
import { UpdatebookComponent } from "../updatebook/updatebook.component";

@Component({
  selector: "app-sellerbooks",
  templateUrl: "./sellerbooks.component.html",
  styleUrls: ["./sellerbooks.component.scss"],
})
export class SellerbooksComponent implements OnInit {
  bookList: Array<Book> = [];
  sort: any = "Tap here to add books";
  sortTech1: any = "Price : Low to High";
  sortTech2: any = "Price : High to Low";
  sortTech3: any = "Newest Arrivals";
  length: number = 0;
  page: number = 1;
  view: any;
  direction: string = "row";
  message: string;
  endPage: number = 1;
  pages: Array<Number> = [];
  constructor(
    private bookService: BookService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private router: Router,
    private data: DataserviceService,
    private viewservice: ViewserviceService
  ) {}

  ngOnInit() {
    this.sort;
    // this.data.currentMessage.subscribe(message => { this.message = message,  this.getAvailableBooks(); });
    // this.viewservice.getView().subscribe(
    //   (res) => {
    //   this.view = res;
    //     this.direction = this.view.data;
    //     console.log(this.direction);
    //   });

    // this.bookService.autoRefresh.subscribe(() => {
    //   this.getAvailableBooks();
    // });

    // this.bookService.refreshNeeded$
    // .subscribe(()=>{this.getAvailableBooks();})

    this.getAvailableBooks();
  }

  getBooksCount() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.bookService.getBooksCount().subscribe((response: any) => {
      this.length = response["obj"];
      if (this.length > 10) {
        for (var i = 1; i <= this.length / 12 + 1; i++) {
          this.pages[i] = i;
        }
        this.endPage = this.pages.length - 2;
      }
    });
  }

  addbook() {
    const dialogRef = this.dialog.open(AddbookComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAvailableBooks();
    });
  }
  updatebook(book: any) {
    const dialogRef = this.dialog.open(UpdatebookComponent, {
      data: {
        bookName: book.bookName,
        bookAuthor: book.bookAuthor,
        bookPrice: book.bookPrice,
        noOfBooks: book.noOfBooks,
        bookDescription: book.bookDescription,
        bookId: book.bookId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result.data);
      this.getAvailableBooks();
    });
  }
  getAvailableBooks() {
    this.bookService.getAvailableSellerBooks().subscribe((response: any) => {
      this.bookList = response["obj"].reverse();
      // this.ngOnInit();
    });
  }
  getAvailableBooksOfPage(pageNo: number) {
    this.bookService
      .getAvailableBooksOfPage(pageNo)
      .subscribe((response: any) => {
        this.bookList = response["obj"];
        this.page = pageNo;
      });
  }
}
