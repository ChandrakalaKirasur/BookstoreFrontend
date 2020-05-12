import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "src/environments/environment";
import { HttpParams } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";

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
}
