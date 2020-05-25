import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from "@angular/material";
import { AddressService } from "src/app/service/address.service";
import { Book } from "src/app/models/book";
import { environment } from "src/environments/environment";
import { UserService } from "src/app/service/user.service";
import { HttpService } from "src/app/service/http.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private httpservice: HttpService,
    private userService: UserService,
    private addressService: AddressService
  ) {}

  visible: boolean;
  profilepic: boolean = false;
  profile: any;
  ngOnInit() {
    this.unverifiedBooks();
    if (localStorage.getItem("token") != null) {
      this.visible = true;
    } else {
      this.profilepic = false;
    }
    this.getprofileLink();
    this.profile = localStorage.getItem("userimage");
  }

  token: String;
  books: Array<Book> = [];

  unVerifiedBooks: [];
  unverifiedBooks() {
    this.userService
      .getRequest("/book/bookdetails/unverified")
      .subscribe((Response: any) => {
        console.log(Response.obj[0]);
        this.unVerifiedBooks = Response.obj;
      });
  }

  both: boolean = true;
  disapprove: boolean = false;
  approve: boolean = false;
  onDisApprove() {
    this.disapprove = true;
    this.both = false;
  }

  onApprove(book: any) {
    console.log(book);
    this.userService
      .putRequest("/book/bookdetails/verify?bookId=" + book.bookId, "")
      .subscribe((Response: any) => {
        console.log(Response.obj);
        this.unVerifiedBooks = Response.obj;
      });
  }

  getprofileLink() {
    this.userService.getRequest(environment.user_profile).subscribe(
      (Response: any) => {
        this.profile = Response.obj;
        if (this.profile != null) {
          this.profilepic = true;
        }
      },
      (error: any) => {
        this.snackbar.open("", "undo", { duration: 2500 });
      }
    );
  }
  file: File;
  fileChange(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      let body = new FormData();
      body.append("file", this.file);
      this.httpservice
        .postMethod(
          `${environment.baseUrl + environment.PROFILE_CHANGE_OR_UPLOAD}` +
            "/" +
            localStorage.getItem("token"),
          body,
          {}
        )
        .subscribe((response: any) => {
          localStorage.setItem("userprofile", response["msg"]);
          this.profilepic = true;
          this.profile = response["msg"];
          console.log("upload", response);
        });
    }
  }
}
