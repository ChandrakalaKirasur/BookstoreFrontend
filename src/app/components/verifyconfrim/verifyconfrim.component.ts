import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-verifyconfrim",
  templateUrl: "./verifyconfrim.component.html",
  styleUrls: ["./verifyconfrim.component.scss"],
})
export class VerifyconfrimComponent implements OnInit {
  bookdata: any;
  constructor(
    public dialogRef: MatDialogRef<VerifyconfrimComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private router: Router
  ) {}

  book: any;
  ngOnInit() {
    console.log(this.data);
  }

  onVerify() {
    this.userService
      .putRequest("/book/bookdetails/verify?bookId=" + this.data.bookId, "")
      .subscribe((Response: any) => {
        this.dialogRef.close();
        window.location.reload();
      });
  }
  onCancel() {
    this.dialogRef.close();
  }
}
