import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  baseurl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  public postRequest(url: any, data: any): any {
    return this.http.post("http://localhost:8080/seller/" + url, data);
  }
  public putRequestForget(url, data) {
    return this.http.post("http://localhost:8080/seller/" + url, data);
  }
}
