import { FrmlistComponent } from "./../setup/frmlist/frmlist.component";
import { CreateTransService } from "./../create-trans.service";
import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  ChangeDetectorRef,
  AfterViewInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { MessageService } from "primeng/api";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Dropdown } from "primeng/dropdown";
import { DynamicFormBuilderComponent } from "../dynamic-form-builder/dynamic-form-builder.component";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-frm-create-trans",
  templateUrl: "./frm-create-trans.component.html",
  styleUrls: ["./frm-create-trans.component.scss"],
})
export class FrmCreateTransComponent
  implements OnInit, OnChanges, AfterViewInit {
  formID: any;
  AccessToken: string;
  UserID: string;
  selectedProduct: string;
  selectedAccount: string;
  selectedTemplate: string;
  products: Object[] = [];
  accounts: Object[] = [];
  templates: Object[] = [];
  rawData: any[] = [];
  public invForm = new FormGroup({});
  unsubcribe: any;
  displayDialog: boolean;

  car: any = {};
  valueDate: any = {};
  selectedCar: any;

  newCar: boolean;

  cars: any[] = [];

  cols: any[] = [];
  product: true;
  /* types: type[]; */
  /*   selectedType: type; */
  isValid: boolean = false;
  uploadedFiles: any[] = [];
  displayModal: Boolean;
  modals: any[] = [];
  transactionArr: any[] = [];
  invoiceArr: any[] = [];
  invoiceData: any[] = [];
  invoiceValues: any[] = [];
  totalrecords: number;
  dynamicForm: FormGroup;
  dialogData: any[] = [];
  invoiceheader: any[] = [];
  transactionData: any[] = [];
  dynform: boolean = true;

  constructor(
    private cdref: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private transService: CreateTransService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    
  ) {
    this.products = [];
    this.accounts = [];
    this.templates = [];
  }

  public fields = [];
  @ViewChild("myDropdown") myDropdown: Dropdown;
  @ViewChild(DynamicFormBuilderComponent) child: DynamicFormBuilderComponent;
  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.formID = params["id"];
      console.log("URL id has changed");
      this.UserID = sessionStorage.getItem("username");
      this.AccessToken = sessionStorage.getItem("token");
      this.getTransCreation();
    });
  }

  ngAfterViewInit() {
    //  this.cdref.detectChanges();
    setTimeout(() => {
      this.myDropdown.focus();
    }, 1);
  }

  ngOnChanges() {}
  getTemplates(ev) {
    var RequestType = "";
    this.transactionArr = [];
    this.invoiceArr = [];
    this.fields = [];
    this.transService
      .getTemplates(
        this.UserID,
        this.AccessToken,
        this.formID,
        RequestType,
        this.selectedTemplate["ConfCode"]
      )
      .subscribe((res) => {
        console.log("Eae", JSON.parse(res.detailData.detail));
        this.fields = JSON.parse(res.detailData.detail);
        console.log(this.fields, "fafafa");
        if(this.fields.length > 0)
        {

       
        this.transactionArr = this.fields.filter((v) => v.MasterDetail == "O");
        this.invoiceArr = this.fields.filter((v) => v.MasterDetail == "I");
        if (this.invoiceArr.length > 0) {
          this.createInvoice();
        }

        this.isValid = true;
        setTimeout(() => {
          if (!this.child.form.valid) {
            this.dynform = false;
          }
        }, 1);
      }
      else{
        this.messageService.add({
          severity: "warn",
          summary: "No template found"
        });
      }
      },
      (error) =>
      {
        this.messageService.add({
          severity: "error",
          summary: "Connection Failed",
          detail: "Connection Timed Out"
        });
      });
  }
  recivemsg(obj) {
    this.transactionData = obj;

    // this.invoiceData.push(obj);
    // console.log(this.invoiceData,"Invoice saved data");
    // this.getuserdata(this.invoiceData);
  }
  addInvData() {
    this.invoiceData.push(this.invForm.getRawValue());
    console.log(this.invForm.get("DOCDT").value);
    // Object.assign(this.invoiceData[this.invoiceData.findIndex(el => el === this.valueDate)], this.valueDate)
    if (this.valueDate != null) {
      for (
        let i = this.invoiceData.length;
        i > this.invoiceData.length - 1;
        i--
      ) {
        // console.log(merge(this.invoiceData[i] , this.valueDate));
        let foo = Object.assign(this.invoiceData[i - 1], this.valueDate);
        console.log(foo, "updated data");
      }
    }

    console.log("INVOICE DATA", this.invoiceData);

    this.getuserdata(this.invoiceData);
    this.invForm.reset();
  }
  deleteInvData() {
    this.invoiceData = [];
  }
  createInvoice() {
    this.invoiceArr.forEach((x) => {
      if(x.Mandatory == 'Y')
      this.invForm.addControl(
        x.ColumnName,
        new FormControl(x.DefaultValue, Validators.required)
      );
      else{
        this.invForm.addControl(
          x.ColumnName,
          new FormControl(x.DefaultValue)
        );
      }
    });
  }
  getFields() {
    return this.transactionArr;
  }

  /* getInvoiceFields(){
  return this.invoiceArr;
} */

  changeFormat(e) {
    console.log(e, "new DATE");

    const pipe = new DatePipe("en-US");
    const date = pipe.transform(e, "shortDate");
    console.log(date, " format");
    // this.valueDate = date;
    this.invoiceArr.forEach((user) => {
      if (user.DataType == "D") {
        const name = user.ColumnName;
        // console.log(nDate , "coloumn Name");

        this.valueDate = {
          [name]: date,
        };

        console.log(this.valueDate, "new DATA");

        // this.invForm.patchValue({
        //   [user.ColumnName]:this.valueDate});
      }
    });
  }
  getuserdata(invoiceDataparam) {
    console.log(invoiceDataparam, "invoice daat param");
    this.invoiceValues = Object.values(invoiceDataparam);
    this.totalrecords = this.invoiceValues.length;
    // this.cols = Object.keys(this.userLists[0]);
    this.cols = [];
    for (var i = 0; i < Object.keys(invoiceDataparam[0]).length; i++) {
      this.cols[i] = {
        header: Object.keys(invoiceDataparam[0])[i],
        field: Object.keys(invoiceDataparam[0])[i],
      };
    }
    console.log(this.totalrecords, "asdasd");

    //  this.userarray.push(this.userList);
  }

  //console.log(this.userarray);

  OnProductChange($event) {
    console.log(this.selectedProduct["ProCode"], "PRODUCTS");
    this.transactionArr = [];
    this.invoiceArr = [];

    this.fields = [];
    var RawAccounts = this.rawData["Account"];
    console.log(this.rawData["Account"], "data");

    this.accounts = RawAccounts.filter(
      (k: { ProCode: any }) => k.ProCode == this.selectedProduct["ProCode"]
    );

    var RawTemplates = this.rawData["TxnTemplate"];
    if (
      RawTemplates.filter(
        (k) => k.ProCode == this.selectedProduct["ProCode"]
      ) == ""
    ) {
      this.templates = this.rawData["TxnTemplate"];
    } else {
      this.templates = RawTemplates.filter(
        (k) => k.ProCode == this.selectedProduct["ProCode"]
      );
    }
  }
  getTransCreation() {
    this.transService
      .getCreateTransaction(this.formID, this.UserID, this.AccessToken)
      .subscribe((res) => {
        console.log("detail data", JSON.parse(res.detailData.detail));
        this.rawData = JSON.parse(res.detailData.detail);

        // this.rawData.push(res.detailData.detail);
        console.log("RawData", this.rawData["Products"]);
        this.products = this.rawData["Products"];
      }, 
      (error)=>
      {setTimeout(() => {
        this.messageService.add({
          severity: "error",
          summary: "Connection Failed",
          detail: "Template not Found"
        });
      }, 2000);
      
      });
  }

  getProducts() {}
  getAccounts() {}
  showDialogToAdd(e) {
    this.newCar = true;
    this.car = [];
    this.displayDialog = true;
    console.log(e);
    this.car.push(e.data);
    console.log(this.car, "nraml");
    this.invoiceheader = [];
    //   this.invoiceheader = Object.keys(this.car);
    for (var i = 0; i < Object.keys(this.car[0]).length; i++) {
      this.invoiceheader[i] = {
        header: Object.keys(this.car[0])[i],
        field: Object.values(this.car[0])[i],
      };
    }
  }

  save() {
    let cars = [...this.invoiceValues];
    var result = {};
    for (var i = 0; i < this.invoiceheader.length; i++) {
      result[this.invoiceheader[i].header] = this.invoiceheader[i].field;
    }
    cars[this.invoiceValues.indexOf(this.selectedCar)] = result;

    this.invoiceValues = cars;
    console.log("NEW INVOICES UPADEAE", this.invoiceValues);
    result = null;
    this.invoiceheader = null;
    this.displayDialog = false;
  }
  submitMaster() {
    this.child.saveData();
    /*  console.log(this.selectedProduct,"selectedProduct");
   console.log(this.selectedAccount,"selectedAccount");

   console.log(this.selectedTemplate,"selectedTemplate"); */
  
    let masterObj = {
      Master: {
        ProCode: this.selectedProduct["ProCode"],
        ProductName: this.selectedProduct["ProName"],
        Behaviour: this.selectedProduct["ProName"],
        DRAccountNo: this.selectedAccount["AC"],
        DRAccTitle: this.selectedAccount["AcTitel"],
        ConfigID: this.selectedTemplate["ConfCode"],
        ConfigDesc: this.selectedTemplate["ConfName"],
      },

      Transactions: this.transactionData,
      Invoice: this.invoiceValues,
    };

    console.log(masterObj);

    this.transService.postMasterTransaction(masterObj).subscribe((res) => {
      this.invoiceValues = []
      this.messageService.add({
        severity: "success",
        summary: "Transaction Created"   
      
         });
    },
    (error)=>{
      this.messageService.add({
        severity: "error",
        summary: "Connection Failed",
        detail: "Check Data Connection"
      });
    });
  }
  delete() {
    let index = this.invoiceValues.indexOf(this.selectedCar);
    this.invoiceValues = this.invoiceValues.filter((val, i) => i != index);
    this.invoiceheader = null;
    this.displayDialog = false;
  }
  cloneCar(c: any): any {
    let car = {};
    for (let prop in c) {
      car[prop] = c[prop];
    }
    return car;
  }
}
