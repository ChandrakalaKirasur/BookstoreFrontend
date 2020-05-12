<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
=======
import { Injectable } from "@angular/core";
>>>>>>> afd3224936faeccebdce58c618495c1ea269da32

@Injectable({
  providedIn: "root",
})
export class HttpService {
<<<<<<< HEAD
  baseurl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  public postRequest(url :any, data: any ):any{
    return this.http.post("http://localhost:8080/seller/" + url,data);
  }
  public putRequestForget(url,data){
    return this.http.post("http://localhost:8080/seller/"+ url,data,);
  }
=======
  constructor() {}
>>>>>>> afd3224936faeccebdce58c618495c1ea269da32
}
