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
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.sort;
    this.getAvailableBooks();
  }
  doSorting(option: any) {
    this.sort = option;
    if (option == "Sort by relevance") {
      this.sortTech1 = "Price : Low to High";
      this.sortTech2 = "Price : High to Low";
      this.sortTech3 = "Newest Arrivals";
      this.getAvailableBooks();
    }
    if (option == "Price : Low to High") {
      this.sortTech1 = "Price : High to Low";
      this.sortTech2 = "Sort by relevance";
      this.sortTech3 = "Newest Arrivals";
      this.bookService
        .getBooksSortedByPriceHigh()
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
        .getBooksSortedByPriceHigh()
        .subscribe((response: any) => {
          this.bookList = response["obj"];
          this.length = this.bookList.length;
        });
    }
    if (option == "Newest Arrivals") {
      this.sortTech1 = "Price : Low to High";
      this.sortTech2 = "Price : High to Low";
      this.sortTech3 = "Sort by relevance";
      this.bookService.getBooksSortedByArrivals().subscribe((response: any) => {
        this.bookList = response["obj"];
        this.length = this.bookList.length;
      });
    }
  }
  getAvailableBooks() {
    this.bookService.getAvailableBooks().subscribe((response: any) => {
      this.bookList = response["obj"];
      this.length = this.bookList.length;
    });
  }
}
