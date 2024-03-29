import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { Login } from "src/app/models/login";
import { Address } from "src/app/models/address";
import { MatSnackBar } from "@angular/material";
import { ViewcartService } from "src/app/service/viewcart.service";
import { Book } from "src/app/models/book";
import { AddressService } from "src/app/service/address.service";
import { Cartdetails } from "src/app/models/cartdetails";

@Component({
  selector: "app-view-cart",
  templateUrl: "./view-cart.component.html",
  styleUrls: ["./view-cart.component.scss"],
})
export class ViewCartComponent implements OnInit {
  images = [{}, {}, {}, {}];
  image: "assets/images/Image 11@2x.png";
  addModel: Address = new Address();

  name = new FormControl([
    Validators.required,
    Validators.minLength(4),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  mobile = new FormControl([
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);
  pincode = new FormControl([
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(6),
  ]);

  locality = new FormControl([
    Validators.required,
    Validators.minLength(10),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  address = new FormControl([
    Validators.required,
    Validators.minLength(8),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  city = new FormControl([
    Validators.required,
    Validators.minLength(10),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  landmark = new FormControl([
    Validators.required,
    Validators.minLength(10),
    Validators.pattern("[a-zA-Z ]*"),
  ]);

  nameValidation() {
    return this.name.hasError("required") ? "" : "";
  }
  phoneNumber() {
    return this.mobile.hasError("required") ? "" : "";
  }
  pincodeValidation() {
    return this.name.hasError("required") ? "" : "";
  }
  localityValidation() {
    return this.locality.hasError("required") ? "" : "";
  }
  addressValidation() {
    return this.address.hasError("required") ? "" : "";
  }
  cityValidation() {
    return this.city.hasError("required") ? "" : "";
  }
  landmarkValidation() {
    return this.landmark.hasError("required") ? "" : "";
  }

  // password = new FormControl(this.login.password, [
  //   Validators.required,
  //   Validators.minLength(7)
  // ]);
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private cartService: ViewcartService,
    private addressService: AddressService
  ) {}

  ngOnInit() {
    this.getbooks();
  }

  //book: Book = new Book();
  cart: Cartdetails = new Cartdetails();
  books: [];
  token: string;
  arrCase: any;
  ln: [];
  res: [];
  booknam: string;
  booklist: [];
  quantity: any;
  bookincart: number;
  myDatas = new Array(this.cart);
  quanity = new Array();
  getbooks() {
    // localStorage.setItem(
    //   "token",
    //   "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIn0.rLyBMZZNdtyq6PbjZo42iT0KzS9bUF-FIVeWiT3sn_-XmCUfdYzmGUS3jfC3zv34YDRkHggWnRVOpSq9K1zcKA"
    // );
    this.token = localStorage.getItem("token");
    this.cartService.getRequest("cart/get_cart/" + this.token).subscribe(
      (Response: any) => {
        this.books = Response.obj;

        this.bookincart = Response.obj.length;
        console.log(this.books);
        for (var len in Response.obj) {
          console.log(this.books["quantityOfBooks"]);
          console.log(this.books["cartId"]);
          console.log(len[0]);
          //this.quantity.push(this.books["quantityOfBooks"]);
          // this.cart.quantity = this.books["quantityOfBooks"];
          // this.cart.cartId = this.books["cartId"];

          //this.quanity.push(this.cart);
          console.log("index1111::" + len);

          this.books = Response.obj[len];
          let res = this.books["booksList"];
          console.log(this.myDatas);

          /**
           * bookdetails
           */
          for (var index in res) {
            // console.log(this.books["cartId"]);
            // this.myDatas.push(res[0]["bookId"]);
            this.myDatas.push(res[0]);
            // this.myDatas.push(this.books["cartId"]);
            // this.myDatas.push(this.books["quantityOfBooks"]);
            //this.myDatas.push(this.quanity);
          }
        }

        console.log(this.myDatas);
      },
      (error: any) => {
        console.error(error);
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500 });
      }
    );
  }

  open: boolean;
  fields: boolean;
  onOpen() {
    this.open = true;
    this.fields = true;
  }

  showSpinner = false;
  open2: boolean;

  onOpen2() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.open2 = true;
    }, 2000);
    this.fields = false;

    this.addressService
      .postRequest("address/add/" + this.token, this.address)
      .subscribe((Response: any) => {});

    console.log(this.addModel.name + "***name");
    console.log(this.addModel.address + "**address");
    console.log(this.addModel.phoneNumber + "**phoneNumber");
    console.log(this.addModel.pincode + "**pincode");
    console.log(this.addModel.locality + "**locality");
    console.log(this.addModel.city + "**city");
  }
  onEdit() {
    this.fields = true;
    this.open2 = false;
  }
  onCheckOut() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(["/books/ordersucess"]);
    }, 2000);
  }

  onQuantity(book: any) {
    console.log(book);
  }
}
