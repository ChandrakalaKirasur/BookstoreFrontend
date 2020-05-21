import { Component, OnInit, Output } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { Login } from "src/app/models/login";
import { Address } from "src/app/models/address";
import {
  MatSnackBar,
  MatRadioChange,
  MatSelectChange,
} from "@angular/material";
import { ViewcartService } from "src/app/service/viewcart.service";
import { Book } from "src/app/models/book";
import { AddressService } from "src/app/service/address.service";
import { Cartdetails } from "src/app/models/cartdetails";
import { DataService } from "src/app/service/data.service";
import { Subject, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpService } from "src/app/service/http.service";
import { environment } from "src/environments/environment";
import { Location } from "@angular/common";
import { EventEmitter } from "events";

@Component({
  selector: "app-view-cart",
  templateUrl: "./view-cart.component.html",
  styleUrls: ["./view-cart.component.scss"],
})
export class ViewCartComponent implements OnInit {
  name = new FormControl([
    Validators.required,
    Validators.minLength(4),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  mobile = new FormControl([
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern("[6-9]\\d{9}"),
  ]);
  pincode = new FormControl([
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(6),
    Validators.pattern("[5-6]\\d{6}"),
  ]);

  locality = new FormControl([
    Validators.required,
    Validators.minLength(10),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  address = new FormControl([
    Validators.required,
    Validators.minLength(8),
    //Validators.pattern("[a-zA-Z ]*"),
    Validators.pattern("[a-zA-Z0-9._%+-]*"),
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
    return this.name.hasError("required")
      ? ""
      : this.name.hasError("name")
      ? ""
      : "";
  }
  phoneNumber() {
    return this.mobile.hasError("required") ? "" : "";
  }
  pincodeValidation() {
    return this.name.hasError("required")
      ? "You must enter a value"
      : this.pincode.hasError("pincode")
      ? "Not a valid email"
      : "";
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

  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private cartService: ViewcartService,
    private http_service: HttpService,
    private data: DataService,
    public location: Location,
    private addressService: AddressService
  ) {}

  ngOnInit() {
    this.getcountofbooks();
    this.getbooks();
  }

  book: Book = new Book();
  bookArray: [];
  //token: string;
  bookNquantityData: Array<Book> = [];
  quantitylist: [];
  bookcount: number;

  placeOrder: boolean = true;
  getcountofbooks() {
    this.cartService.getRequest(environment.book_count_cart).subscribe(
      (Response: any) => {
        this.bookcount = Response.obj;

        if (this.bookcount == 0) {
          this.placeOrder = false;
        }
      },
      (error: any) => {
        this.snackbar.open(error.error.message, "undo", { duration: 1000 });
      }
    );
  }

  getbooks() {
    this.cartService.getRequest(environment.Get_book_Cart).subscribe(
      (Response: any) => {
        this.bookArray = Response.obj;
        /**
         * cart Details
         */
        for (var len in Response.obj) {
          this.bookArray = Response.obj[len];
          /**
           * bookdetails
           */
          if (this.bookArray["booksList"][0] != null) {
            this.book = this.bookArray["booksList"][0]; //adding book details to bookmodel
            this.book.quantitybto = this.bookArray["quantityOfBooks"];
            this.bookNquantityData.push(this.book);
          }
        }
        // console.log(this.bookNquantityData);
        this.snackbar.open(Response.message, "undo", { duration: 1500 });
      },
      (error: any) => {
        this.snackbar.open(error.error.message, "undo", { duration: 1000 });
      }
    );
  }

  onQuantity(book: any) {
    /**
     * if bookcount is equal to noOfBooks available
     */
    if (book.quantitybto[0]["quantityOfBook"] == book.noOfBooks) {
      this.snackbar.open(
        "Only " +
          book.quantitybto[0]["quantityOfBook"] +
          " books are avaliable",
        "undo",
        { duration: 2500 }
      );
    } else {
      book.quantitybto[0]["quantityOfBook"] + 1;
      book.totalPrice =
        book.quantitybto[0]["quantityOfBook"] * book["bookPrice"];
      this.cartService
        .putRequest(
          environment.cart_inc_bookquantity + "?bookId=" + book.bookId,
          book.quantitybto[0]
        )
        .subscribe(
          (Response: any) => {
            if (Response.obj["quantityOfBooks"] != null) {
              book.quantitybto = Response.obj["quantityOfBooks"];
            }
          },
          (error: any) => {
            this.snackbar.open(error.error.message, "undo", { duration: 1000 });
          }
        );
    }
  }

  ondescQuantity(book: any) {
    if (book.quantitybto[0]["quantityOfBook"] == 1) {
      this.snackbar.open("Atleast 1 Book in the cart", "undo", {
        duration: 2500,
      });
    } else {
      book.quantitybto[0]["quantityOfBook"] + 1;
      book.totalPrice =
        book.quantitybto[0]["quantityOfBook"] * book["bookPrice"];
      this.cartService
        .putRequest(
          environment.cart_desc_bookquantity + "?bookId=" + book.bookId,
          book.quantitybto[0]
        )
        .subscribe(
          (Response: any) => {
            if (Response.obj["quantityOfBooks"] != null) {
              book.quantitybto = Response.obj["quantityOfBooks"];
            }
          },
          (error: any) => {
            this.snackbar.open("cannot descrease", "undo", { duration: 1000 });
          }
        );
    }
  }

  count: boolean = true;
  addressclose: boolean = true;

  onRemove(book: any) {
    this.cartService
      .deleteRequest(
        environment.REMOVE_FROM_CART +
          localStorage.getItem("token") +
          "/" +
          book.bookId,
        ""
      )
      .subscribe(
        (Response: any) => {
          if (Response.obj) {
            for (var index in this.bookNquantityData) {
              if (this.bookNquantityData[index] == book) {
                this.bookNquantityData[index] = null;
              }
            }
            this.bookcount -= 1;
            this.count = false;
          }

          this.placeOrder = true;
          this.open = false;
          this.open2 = false;
        },
        (error: any) => {
          this.snackbar.open(error.error.message, "undo", { duration: 1000 });
        }
      );
  }

  open: boolean;
  fields: boolean;
  person: String;

  // onChange(mrChange: MatRadioChange) {
  //   this.open2 = false;
  //   console.log(mrChange.value);
  //   this.person = mrChange.value;
  // }
  favoriteSeason: String = "Home";
  seasons = ["Home", "Work", "Other"];

  shippingCharge: number;
  selected(event: MatSelectChange) {
    if (event.value == "india") {
      this.shippingCharge = 50;
    } else {
      this.shippingCharge = 100;
    }
  }

  onplaceOrder() {
    this.open = true;
    this.fields = true;

    this.getaddress();
  }

  showSpinner = false;
  open2: boolean;
  addModel: Address = new Address();
  OrderDetails: Array<Book> = [];
  grandTotal: number;
  onContinue() {
    this.grandTotal = 0;
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();

      // this.addModel.type = this.person;
      this.addModel.type == this.favoriteSeason;
      this.addressService
        .postRequest(
          "address/add/" + localStorage.getItem("token"),
          this.addModel
        )
        .subscribe(
          (Response: any) => {
            this.fields = false;
            this.open2 = true;
            this.snackbar.open(Response.message, "undo", {
              duration: 3000,
            });
          },
          (error: any) => {
            this.snackbar.open(error.error.message, "undo", { duration: 1000 });
          }
        );
    }, 2000); //spinner

    for (var index in this.bookNquantityData) {
      if (this.bookNquantityData[index] != null) {
        this.grandTotal += this.bookNquantityData[index]["quantitybto"][0][
          "totalprice"
        ];
      }
    }
    this.grandTotal += this.shippingCharge;
  }

  onEdit() {
    this.fields = true;
    this.open2 = false;
  }

  onCheckOut(book: any) {
    //console.log(book);
    this.spinner.show();
    this.showSpinner = true;

    this.cartService
      .postRequest(
        environment.orderlist_books_confrim + localStorage.getItem("token"),
        ""
      )
      .subscribe(
        (Response: any) => {
          setTimeout(() => {
            this.spinner.hide();
            this.router.navigate([
              "/books/ordersucess/",
              { orderId: Response.obj.orderId },
            ]);
            this.snackbar.open(Response.message, "undo", { duration: 2500 });
          }, 2000);
        },
        (error: any) => {
          this.snackbar.open(error.error.message, "undo", { duration: 2500 });
        }
      );
  }

  getaddress() {
    this.addressService
      .getRequest(environment.cart_home_address)
      .subscribe((Response: any) => {
        //console.log(Response);
        if (Response.status) {
          this.addModel.address = Response.obj["address"];
          this.addModel.city = Response.obj["city"];
          this.addModel.landmark = Response.obj["landmark"];
          this.addModel.locality = Response.obj["locality"];
          this.addModel.name = Response.obj["name"];
          this.addModel.phoneNumber = Response.obj["phoneNumber"];
          this.addModel.pincode = Response.obj["pincode"];
          this.addModel.type = Response.obj["type"];
        }
      });
  }

  onwork() {
    this.addressService
      .getRequest(environment.cart_work_address)
      .subscribe((Response: any) => {
        //console.log(Response);
        if (Response.status) {
          this.addModel.address = Response.obj["address"];
          this.addModel.city = Response.obj["city"];
          this.addModel.landmark = Response.obj["landmark"];
          this.addModel.locality = Response.obj["locality"];
          this.addModel.name = Response.obj["name"];
          this.addModel.phoneNumber = Response.obj["phoneNumber"];
          this.addModel.pincode = Response.obj["pincode"];
          this.addModel.type = Response.obj["type"];
        }
      });
  }

  onOther() {
    this.addressService
      .getRequest(environment.cart_other_address)
      .subscribe((Response: any) => {
        //console.log(Response);
        if (Response.status) {
          console.log(Response.obj["type"]);
          this.addModel.address = Response.obj["address"];
          this.addModel.city = Response.obj["city"];
          this.addModel.landmark = Response.obj["landmark"];
          this.addModel.locality = Response.obj["locality"];
          this.addModel.name = Response.obj["name"];
          this.addModel.phoneNumber = Response.obj["phoneNumber"];
          this.addModel.pincode = Response.obj["pincode"];
          this.addModel.type = Response.obj["type"];
        }
      });
  }
}
