import { Component, OnInit } from "@angular/core";
import { MatSnackBar, MatDialog } from "@angular/material";
import { HttpService } from "src/app/service/http.service";
import { UserService } from "src/app/service/user.service";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: "app-admindashboard",
  templateUrl: "./admindashboard.component.html",
  styleUrls: ["./admindashboard.component.scss"],
})
export class AdmindashboardComponent implements OnInit {
  constructor(
    private snackbar: MatSnackBar,
    private httpservice: HttpService,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  visible: boolean;
  approve: boolean = true;
  profilepic: boolean = false;
  profile: any;
  ngOnInit() {
    if (localStorage.getItem("token") != null) {
      this.visible = true;
    } else {
      this.profilepic = false;
    }

    //this.getprofileLink();
    this.profile = localStorage.getItem("userimage");
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
  app: boolean;
  getDisApprove() {
    this.app = true;
    this.approve = false;
    this.router.navigate(["books/disapprovebooks"]);
  }

  getApprove() {
    this.approve = true;

    this.router.navigate(["books/admin"]);
  }
}
