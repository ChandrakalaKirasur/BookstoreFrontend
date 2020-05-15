import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { Login } from "src/app/models/login";
import { Address } from "src/app/models/address";
import { MatSnackBar, MatRadioChange } from "@angular/material";
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

@Component({
  selector: "app-view-cart",
  templateUrl: "./view-cart.component.html",
  styleUrls: ["./view-cart.component.scss"],
})
export class ViewCartComponent implements OnInit {
  image: "assets/images/Image 11@2x.png";

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
    private http_service: HttpService,
    private data: DataService,
    private snackBar: MatSnackBar,
    public location: Location,
    private addressService: AddressService
  ) {}

  ngOnInit() {
    this.getcountofbooks();
    this.getbooks();
    this.getaddress();
  }

  book: Book = new Book();
  books: [];
  token: string;
  myDatas: Array<Book> = [];
  quantitylist: [];
  bookincart: number;

  placeOrder: boolean = true;
  getcountofbooks() {
    this.token = localStorage.getItem("token");
    this.cartService.getRequest(environment.book_count_cart).subscribe(
      (Response: any) => {
        // console.log(Response);
        this.bookincart = Response.obj;
        if (this.bookincart == 0) {
          this.placeOrder = false;
        }
      },
      (error: any) => {
        //console.error(error);
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500 });
      }
    );
  }

  //totalPrice;
  getbooks() {
    this.token = localStorage.getItem("token");
    this.cartService.getRequest(environment.Get_book_Cart).subscribe(
      (Response: any) => {
        //console.log(Response);
        this.books = Response.obj;

        //this.bookincart = Response.obj.length;
        console.log(this.books);
        for (var len in Response.obj) {
          this.books = Response.obj[len];
          let res = this.books["booksList"];
          let qt = this.books["quantityOfBooks"];

          /**
           * bookdetails
           */
          for (var index in res) {
            this.book = res[0]; //book details
            this.book["noOfBooks"];

            this.quantitylist = this.books["quantityOfBooks"];
            this.book.quantitybto = this.books["quantityOfBooks"];
            this.book.totalPrice =
              this.book.quantitybto[0]["quantityOfBook"] *
              this.book["bookPrice"];
            this.myDatas.push(this.book);
          }
        }
        console.log(this.myDatas);
        this.snackbar.open(Response.message, "undo", { duration: 2500 });
      },
      (error: any) => {
        console.error(error);
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500 });
      }
    );
  }

  onQuantity(book: any) {
    console.log(book);

    // console.log(book.quantitybto[index]);
    this.cartService
      .putRequest(
        environment.cart_inc_bookquantity + "?bookId=" + book.bookId,
        book.quantitybto[0]
      )
      .subscribe(
        (Response: any) => {
          console.log(book.quantitybto);
          console.log(Response.obj["quantityOfBooks"]);
          book.quantitybto = Response.obj["quantityOfBooks"];
          console.log(this.book);
        },
        (error: any) => {
          console.log(error.error.message);
          this.snackbar.open(error.error.message, "undo", { duration: 2500 });
        }
      );

    //this.data.changeMessage("bookquantity");
  }

  ondescQuantity(book: any) {
    console.log(book);
    // for (var index in book.quantitybto) {
    this.cartService
      .putRequest(
        environment.cart_desc_bookquantity + "?bookId=" + book.bookId,
        book.quantitybto[0]
      )
      .subscribe(
        (Response: any) => {
          console.log(book.quantitybto);
          console.log(Response.obj["quantityOfBooks"]);
          book.quantitybto = Response.obj["quantityOfBooks"];
          console.log(this.book);
        },
        (error: any) => {
          console.log(error.error.message);
          this.snackbar.open(error.error.message, "undo", { duration: 2500 });
        }
      );
  }

  onRemove(book: any) {
    console.log(book);
    //for (var index in book.quantitybto) {
    this.token = localStorage.getItem("token");
    this.cartService
      .deleteRequest(
        environment.REMOVE_FROM_CART + this.token + "/" + book.bookId,
        ""
      )
      .subscribe((Response: any) => {
        if (Response.obj) {
          for (var index in this.myDatas) {
            if (this.myDatas[index] == book) {
              this.myDatas[index] = null;
              //console.log(this.bookincart - 1);
            }
          }
        }
      });

    //   ,
    //   (error: any) => {
    //     console.log(error.error.message);
    //     this.snackbar.open(error.error.message, "undo", { duration: 2500 });
    //   }
    // );
  }

  open: boolean;
  fields: boolean;
  person: String;
  onChange(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    this.person = mrChange.value;
  }
  onOpen() {
    this.open = true;
    this.fields = true;
  }

  showSpinner = false;
  open2: boolean;
  addModel: Address = new Address();
  onOpen2() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.open2 = true;
    }, 2000);

    this.addModel.type = this.person;
    this.addressService
      .postRequest("address/add/" + this.token, this.addModel)
      .subscribe((Response: any) => {
        this.fields = false;
      });
    this.snackBar.open("adress added Successfully", "undo", { duration: 3000 });
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
    this.cartService
      .postRequest(
        environment.orderlist_books_confrim + localStorage.getItem("token"),
        ""
      )
      .subscribe(
        (Response: any) => {
          this.snackbar.open(Response.message, "undo", { duration: 2500 });
        },
        (error: any) => {
          console.error(error);
          console.log(error.error.message);
          this.snackbar.open(error.error.message, "undo", { duration: 2500 });
        }
      );
  }

  getaddress() {
    this.addModel.name = "saikiran";
    this.addModel.type = "Home";
  }
  // getaddress() {
  //   this.cartService
  //     .getRequest(
  //       "address/getAddress/" + localStorage.getItem("token") + "/" + "home"
  //     )
  //     .subscribe(
  //       (Response: any) => {
  //         console.log(Response);

  //         console.log(this.addModel.name + "***name");
  //         console.log(this.addModel.address + "**address");
  //         console.log(this.addModel.phoneNumber + "**phoneNumber");
  //         console.log(this.addModel.pincode + "**pincode");
  //         console.log(this.addModel.locality + "**locality");
  //         console.log(this.addModel.city + "**city");
  //         // console.log(Response);
  //         //this.bookincart = Response.obj;
  //       },
  //       (error: any) => {
  //         //console.error(error);
  //         console.log(error.error.message);
  //         this.snackbar.open(error.error.message, "undo", { duration: 2500 });
  //       }
  //     );
  // }
}
