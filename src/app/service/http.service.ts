import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private _httpClient: HttpClient) {}
  public postMethod(url: string, body: any, options: any): Observable<any> {
    return this._httpClient.post(url, body, options);
  }
  public getMethod(url: string, options: any): Observable<any> {
    return this._httpClient.get(url, options);
  }
  public putMethod(url: string, body: any, options: any): Observable<any> {
    return this._httpClient.put(url, body, options);
  }
  public deleteMethod(url: string, options: any): Observable<any> {
    return this._httpClient.delete(url, options);
  }
  public httpOptions = {
    headers: new HttpHeaders({
      "content-type": "application/json",
      token: localStorage.getItem("token"),
    }),
  };
  baseurl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  public postRequest(url :any, data: any ):any{
    return this.http.post("http://localhost:8080/seller/" + url,data);
  }
  public putRequestForget(url,data){
    return this.http.post("http://localhost:8080/seller/"+ url,data,);
  }
}
