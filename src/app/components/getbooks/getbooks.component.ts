import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { BookService } from "src/app/service/book.service";
import { Book } from "src/app/models/book";

@Component({
  selector: "app-getbooks",
  templateUrl: "./getbooks.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./getbooks.component.scss"],
})
export class GetbooksComponent implements OnInit {
  bookList: Book[];
  sort: any = "Sort by relevance";
  sortTech1: any = "Price : Low to High";
  sortTech2: any = "Price : High to Low";
  sortTech3: any = "Newest Arrivals";
  length: number;
  page: number = 1;
  endPage: number;
  pages: Array<Number> = [];
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.sort;
    this.getAvailableBooks();
    this.getBooksCount();
  }
  doSorting(option: any) {
    this.sort = option;
    if (option == "Sort by relevance") {
      this.sortTech1 = "Price : Low to High";
      this.sortTech2 = "Price : High to Low";
      this.sortTech3 = "Newest Arrivals";
      this.getAvailableBooksOfPage(this.page);
    }
    if (option == "Price : Low to High") {
      this.sortTech1 = "Price : High to Low";
      this.sortTech2 = "Sort by relevance";
      this.sortTech3 = "Newest Arrivals";
      this.bookService
        .getBooksSortedByPriceLow(this.page)
        .subscribe((response: any) => {
          this.bookList = response["obj"];
          this.length = this.bookList.length;
        });
    }
    if (option == "Price : High to Low") {
      this.sortTech1 = "Price : Low to High";
      this.sortTech2 = "Sort by relevance";
      this.sortTech3 = "Newest Arrivals";
      this.bookService
        .getBooksSortedByPriceHigh(this.page)
        .subscribe((response: any) => {
          this.bookList = response["obj"];
          this.length = this.bookList.length;
        });
    }
    if (option == "Newest Arrivals") {
      this.sortTech1 = "Price : Low to High";
      this.sortTech2 = "Price : High to Low";
      this.sortTech3 = "Sort by relevance";
      this.bookService
        .getBooksSortedByArrivals(this.page)
        .subscribe((response: any) => {
          this.bookList = response["obj"];
          this.length = this.bookList.length;
        });
    }
  }
  getAvailableBooks() {
    this.bookService.getAvailableBooks().subscribe((response: any) => {
      this.bookList = response["obj"];
    });
  }
  getAvailableBooksOfPage(pageNo: number) {
    this.bookService
      .getAvailableBooksOfPage(pageNo)
      .subscribe((response: any) => {
        this.bookList = response["obj"];
        this.length = this.bookList.length;
        this.page = pageNo;
      });
  }
  nextPage() {
    this.page = this.page + 1;
    this.doSorting(this.sort);
  }
  previousPage() {
    this.page = this.page - 1;
    this.doSorting(this.sort);
  }
  getBooksCount() {
    this.bookService.getBooksCount().subscribe((response: any) => {
      this.length = response["obj"];
      if(this.length > 10){
      for (var i = 1; i <= this.length / 10 + 1; i++) {
        this.pages[i] = i;
      }
      this.endPage = this.pages.length - 2;
    }
    else{
      this.page = 1;
    }
    });
  }
}
