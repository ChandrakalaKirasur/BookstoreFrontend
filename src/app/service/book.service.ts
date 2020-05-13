import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "src/environments/environment";
import { HttpParams } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BookService {
  constructor(private http_service: HttpService) {}
  private subject = new Subject<any>();
  private content = new BehaviorSubject<number>(0);
  public share = this.content.asObservable();
  public get autoRefresh() {
    return this.subject;
  }
  getAvailableBooks() {
    let params = new HttpParams();
    params = params.append("pageNo", "1");
    return this.http_service.getMethod(
      environment.baseUrl + environment.BOOK_BASE_URL,
      { params: params }
    );
  }
  getAvailableBooksOfPage(pageNo:any) {
    let params = new HttpParams();
    params = params.append("pageNo", pageNo);
    return this.http_service.getMethod(
      environment.baseUrl + environment.BOOK_BASE_URL,
      { params: params }
    );
  }
  addToCart(bookId: number) {
    let params = new HttpParams();
    params = params.append("bookId", bookId + "");
    let token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIn0.3UNt1XGVtK94jS7hAFXZKKi7m1iU7cK0deZFrsD5EtZpuCeYi-xua1UIfRrjCTfo5CXxjIfO6V51yzRIboDdig";
    return this.http_service
      .postMethod(
        environment.baseUrl + environment.ADD_TO_CART + token + "/" + bookId,
        {},
        {}
      )
      .pipe(
        tap(() => {
          this.subject.next();
        })
      );
  }
  removeFromCart(bookId: number) {
    let params = new HttpParams();
    params = params.append("bookId", bookId + "");
    let token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIn0.3UNt1XGVtK94jS7hAFXZKKi7m1iU7cK0deZFrsD5EtZpuCeYi-xua1UIfRrjCTfo5CXxjIfO6V51yzRIboDdig";
    return this.http_service
      .postMethod(
        environment.baseUrl +
          environment.REMOVE_FROM_CART +
          token +
          "/" +
          bookId,
        {},
        {}
      )
      .pipe(
        tap(() => {
          this.subject.next();
        })
      );
  }
  addToWishList(bookId: number) {
    let params = new HttpParams();
    params = params.append("bookId", bookId + "");
    let token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIn0.3UNt1XGVtK94jS7hAFXZKKi7m1iU7cK0deZFrsD5EtZpuCeYi-xua1UIfRrjCTfo5CXxjIfO6V51yzRIboDdig";
    return this.http_service
      .postMethod(
        environment.baseUrl +
          environment.ADD_TO_WISHLIST +
          token +
          "/" +
          bookId,
        {},
        {}
      )
      .pipe(
        tap(() => {
          this.subject.next();
        })
      );
  }
  removeFromWishList(bookId: number) {
    let params = new HttpParams();
    params = params.append("bookId", bookId + "");
    let token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIn0.3UNt1XGVtK94jS7hAFXZKKi7m1iU7cK0deZFrsD5EtZpuCeYi-xua1UIfRrjCTfo5CXxjIfO6V51yzRIboDdig";
    return this.http_service
      .postMethod(
        environment.baseUrl +
          environment.REMOVE_FROM_WISHLIST +
          token +
          "/" +
          bookId,
        {},
        {}
      )
      .pipe(
        tap(() => {
          this.subject.next();
        })
      );
  }
  getBooksSortedByPriceHigh() {
    let params = new HttpParams();
    params = params.append("pageNo", "1");
    return this.http_service.getMethod(
      environment.baseUrl + environment.SORT_BY_HIGH_TO_LOW,
      { params: params }
    );
  }
  getBooksSortedByPriceLow() {
    let params = new HttpParams();
    params = params.append("pageNo", "1");
    return this.http_service.getMethod(
      environment.baseUrl + environment.SORT_BY_LOW_TO_HIGH,
      { params: params }
    );
  }
  getBooksSortedByArrivals() {
    let params = new HttpParams();
    params = params.append("pageNo", "1");
    return this.http_service.getMethod(
      environment.baseUrl + environment.SORT_BY_NEW_ARRIVALS,
      { params: params }
    );
  }
}
