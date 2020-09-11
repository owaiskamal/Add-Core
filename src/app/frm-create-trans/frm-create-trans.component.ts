import { element } from 'protractor';
import { FrmlistComponent } from "./../setup/frmlist/frmlist.component";
import { CreateTransService } from "./../create-trans.service";
import * as papa from 'papaparse'
import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  ChangeDetectorRef,
  AfterViewInit,
  Inject,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as xlsx from 'xlsx';
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
import { stringify } from 'querystring';
import { Title } from '@angular/platform-browser';
import { UserauthService } from '../userauth.service';


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
  tabIndex: number;
  selectedProduct: string;
  selectedAccount: string;
  selectedTemplate: string;
  selectedDelivered:string;
  products: Object[] = [];
  accounts: Object[] = [];
  templates: Object[] = [];
  rawData: any[] = [];
  jsonArr: any[] = [];
  delieveredTo:any[] = [];
  delivertoArray:any[] = []
  popupDropdown:any[] = [];
  array :any  = {};
  public invForm = new FormGroup({});
  unsubcribe: any;
  displayDialog: boolean;
  displayDeliverDialog:boolean;
  expectedSequence :any[]= []
  car: any = {};
  popupConfig:any = [];
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
  popupConfigData:any[]= [];
  transactionData: any[] = [];
  dynform: boolean = true;
  csvArray: any[] = [];
  v: any;

  constructor(
    private cdref: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private transService: CreateTransService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router : Router,
    private title : Title,
    private logoutService : UserauthService
  ) {
    this.products = [];
    this.accounts = [];
    this.templates = [];
  }

  public fields = [];
  @Inject('ImageURL') public ImageURL
  @ViewChild("myDropdown") myDropdown: Dropdown;
  @ViewChild(DynamicFormBuilderComponent) child: DynamicFormBuilderComponent;

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.formID = params["id"];
      var title1 =this._route.snapshot.paramMap.get('title')
      this.title.setTitle("CR-PL - " +title1);
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
    console.log(obj , "recieved");

    this.transactionData = obj;
    console.log(this.transactionData,"before transactipn")
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
  clearField(){
    this.invForm.reset();
    this.child.form.reset();
    this.invoiceValues = [];
    this.invoiceData = [];
  }
  deleteInvData() {
    this.invoiceData = [];
  }
  createInvoice() {
    this.invoiceArr.forEach((x) => {
      this.v = x;
      if(x.Mandatory == 'Y')
      this.invForm.addControl(
        x.ColumnName,
        new FormControl(x.DefaultValue, [Validators.required,Validators.minLength(x.MinLeng)])
      );
      else{
        this.invForm.addControl(
          x.ColumnName,
          new FormControl(x.DefaultValue,Validators.minLength(x.MinLeng))
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
    const date = pipe.transform(e, "dd/MM/yyyy");
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
    console.log(this.invoiceValues , "data");

    this.totalrecords = this.invoiceValues.length;
    // this.cols = Object.keys(this.userLists[0]);
    this.cols = [];
    for (var i = 0; i < Object.keys(invoiceDataparam[0]).length; i++) {
      this.cols[i] = {
        header: Object.keys(invoiceDataparam[0])[i],
        field: Object.keys(invoiceDataparam[0])[i],
      };
    }
    console.log(this.cols, "asdasd");

    //  this.userarray.push(this.userList);
  }

  //console.log(this.userarray);

  OnProductChange($event) {
    console.log(this.selectedProduct["ProCode"], "PRODUCTS");
    console.log(this.selectedProduct["ProBehavior"], "Product Behavior");
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
        if(res.code == '00')
      {
        console.log( res ,"detail data");
        this.rawData = JSON.parse(res.detailData.detail);

        // this.rawData.push(res.detailData.detail);
        console.log("RawData", this.rawData["Products"]);
        this.products = this.rawData["Products"];
        this.delieveredTo = this.rawData["DeliverTo"];
        console.log(this.delieveredTo,"popup Data")
        this.popupDropdown = Object.keys(this.delieveredTo)
        console.log(this.popupDropdown,"popup dropdown");
        console.log(Object.values(this.delieveredTo),"input fields config");
      }
      else if (res.code == "-1")
      {
        this.messageService.add({
          severity: "error",
          summary: "Connection Failed",
          detail: "Session Expired"
        });
        var username = sessionStorage.getItem('username');
        console.log(username , "userNAME");

        this.logoutService.userLogout(username).subscribe(res =>
          {
            console.log(res);

          });
 sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("menuitem");

          setTimeout(() => {
            this.router.navigateByUrl('');

          }, 3000);
          }
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
  typeOf(value) {
    return typeof value;
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
  onTabChange(event) {
    console.log("TAB INDEX",event.index);
    this.tabIndex = event.index;
}
OnDeliveredChange(event){
console.log(event.value,"delievered change");
console.log(this.delieveredTo[event.value],"event delievered value");
this.popupConfigData = [];
this.popupConfig = [];
this.popupConfig.push(this.delieveredTo[event.value]);
console.log(this.popupConfig,"popconfig");

for (var i = 0; i < Object.keys(this.popupConfig[0]).length; i++) {
  this.popupConfigData[i] = {
    header: Object.keys(this.popupConfig[0])[i],
    field: ""
  };
}
}
mainSubmit(){
  let masterObj = {
    FormID: this.formID,
    UserID: this.UserID,
    AccessToken: this.AccessToken,
    Master: {
      ProCode: this.selectedProduct["ProCode"],
      ProductName: this.selectedProduct["ProName"],
      Behaviour: this.selectedProduct["ProBehavior"],
      DRAccountNo: this.selectedAccount["AC"],
      DRAccTitle: this.selectedAccount["AcTitel"],
      ConfigID: this.selectedTemplate["ConfCode"],
      ConfigDesc: this.selectedTemplate["ConfName"],
    },

    Transactions: this.transactionData,
    Invoice: this.invoiceValues,

  };

  console.log(this.convertToString(masterObj),"convert to string");
  console.log(masterObj);
  this.transService.postMasterTransaction(masterObj).subscribe((res:any) => {
    this.popupConfigData = [];

    this.invoiceData = [];
    this.displayDeliverDialog = false
    console.log(res , "jhjh");
    if(res.code == "-1"){

      this.messageService.add({
        severity: "error",
        summary: res.description

         });
     }
     else if(res.code == "00"){
      this.child.form.reset();
      this.messageService.add({
        severity: "success",
        summary: res.description

         });

     }
  },
  (error)=>{
    this.invoiceData = [];

    console.log(error.error,'invoice error')

    this.messageService.add({
      severity: "error",
      summary: "Connection Failed",
      detail: error.error.title
    });
  });
}
convertToString(obj){
  Object.keys(obj).forEach(i=>{
    if(typeof(obj[i])==='object'){
      return this.convertToString(obj[i]);
    }
    obj[i] = '' + obj[i];
  })
   return obj;

}
submitPopup(){
  console.log(this.popupConfigData,"popup config");
  let deliverTo = {};
  this.delivertoArray = [];
/*   this.popupConfigData.forEach(element => {
    console.log(element.header,"eleemnt ehader");
    deliverTo = {
      [element.header]: element.field
    }
    this.delivertoArray.push(deliverTo);


  }); */
  //this.transactionData.concat(this.delivertoArray)
  console.log(this.delivertoArray,"delivertoarray");
  console.log(this.transactionData,"transactionData");
//console.log(table,"table");

for(let i = 0 ;i < this.popupConfigData.length;i++){
  deliverTo[this.popupConfigData[i].header] = this.popupConfigData[i].field
}
    this.delivertoArray.push(deliverTo);
this.transactionData['deliverto'] = deliverTo;
this.mainSubmit();
console.log(this.transactionData,"new trasactionata");
}
  submitMaster() {
    if(!this.child.form.valid || this.invForm.invalid)
   {
      return;
   }
    this.child.saveData();
    /*  console.log(this.selectedProduct,"selectedProduct");
   console.log(this.selectedAccount,"selectedAccount");

   console.log(this.selectedTemplate,"selectedTemplate"); */

   if(this.selectedProduct["ProBehavior"]=="K" || this.selectedProduct["ProBehavior"]=="P"||
   this.selectedProduct["ProBehavior"]=="D" ||  this.selectedProduct["ProBehavior"]=="S"){
     this.displayDeliverDialog = true


     console.log(this.displayDeliverDialog,"checking dialog");
     console.log("Product true");

     this.array = this.popupDropdown.map((o) => ({
      label : o,
      value : o
      }))
      console.log(this.array,"dropdown array")

   }
   else{
     this.displayDeliverDialog = false;
     console.log(this.displayDeliverDialog,"checking dialog");
     console.log("Product false");
     this.mainSubmit();
   }


//    console.log(masterObj);



     /*  this.transService.postMasterTransaction(masterObj).subscribe((res:any) => {
      this.invoiceData = [];
      console.log(res , "jhjh");
      if(res.code == "-1"){
        this.messageService.add({
          severity: "error",
          summary: res.description

           });
       }
       else if(res.code == "0"){
        this.messageService.add({
          severity: "success",
          summary: res.description

           });
       }
    },
    (error)=>{
      this.invoiceData = [];
      console.log(error.error,'invoice error')

      this.messageService.add({
        severity: "error",
        summary: "Connection Failed",
        detail: error.error.title
      });
    }); */
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
//   exportExcel() {
//     import("xlsx").then(xlsx => {
//         const worksheet = xlsx.utils.json_to_sheet(this.invoiceData);
//         const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
//         const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
//         this.saveAsExcelFile(excelBuffer, "primengTable");
//     });
//   }
//   saveAsExcelFile(buffer: any, fileName: string): void {
//     import("file-saver").then(FileSaver => {
//         let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//         let EXCEL_EXTENSION = '.xlsx';
//         const data: Blob = new Blob([buffer], {
//             type: EXCEL_TYPE
//         });
//         FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
//     });
// }

onBasicUpload(event : any){
/*   console.log(event,"file event")
  for(let file of event.files) {
    this.uploadedFiles.push(file);
}

this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''}); */
/* console.log(event,"eventt")
let input = event.files;
let reader: FileReader = new FileReader();
reader.readAsText(input[0]);
reader.onload = (e) => {
  let csv  = reader.result;
  alert(csv);
  console.log(csv);
} */
let workBook = null;
let jsonData = null;
const reader = new FileReader();
const file = event.files[0];
this.invoiceData = this.invForm.getRawValue();
this.expectedSequence = Object.keys(this.invoiceData);
this.invoiceData=[]
console.log(file,"file is here");
var regex = /(xlsx|csv|txt)$/i
var extension = regex.exec(file.name);
if(extension[0] === 'xlsx')
{
console.log(extension , "asdasdasdasdasd");

reader.onload = (ev) => {
  console.log(ev , "asdasdad");

  const data = reader.result;
  workBook = xlsx.read(data, { type: 'binary'  ,cellDates: true });
  jsonData = workBook.SheetNames.reduce((initial, name) => {
    const sheet = workBook.Sheets[name];
    initial[name] = xlsx.utils.sheet_to_json(sheet , {header:1, raw:false,dateNF:'dd/mm/yyyy'});
    return initial;
  }, {});
  const dataString = JSON.stringify(jsonData);
  console.log(dataString,"stringify data");
  this.jsonArr = JSON.parse(dataString)
  console.log(this.jsonArr,"parsed json");
  console.log(Object.keys(this.jsonArr['data'][0]))

console.log(this.expectedSequence , "this is seq");
var jsonDATA = []
for(let i = 1; i<this.jsonArr['data'].length;i++){
  console.log(    this.jsonArr['data'][i]  , "datat");

this.jsonArr['data'][i] = Object.assign({}, ...Object.entries(this.jsonArr['data'][i])
         .map(([, prop], index) => ({[this.expectedSequence[index]]: prop})));
          jsonDATA.push(this.jsonArr['data'][i]);
}
         console.log(jsonDATA , "changed header");

          this.getuserdata(jsonDATA)

// const sortObject = (obj) =>
//   Object.fromEntries(
//     Object.entries(obj).sort(
//       ([a], [b]) => this.expectedSequence.indexOf(a) - this.expectedSequence.indexOf(b)
//     )
//   );
// console.log(sortObject ,"soreee");

// const updated = this.jsonArr['data'].map(sortObject);
// console.log(updated , "QWEQE");
// const updated = this.autoFormatter(this.expectedSequence , this.jsonArr['data'])
//  console.log(updated , "QWEQE");
// this.invoiceValues = updated

// for(let i = 0 ; i< da.length ; i++)
// {
//   if(da[i] != la[i])
//   {
//     console.log( i , "oh yeah");
//    arr.push(i);
//   }
//   console.log(arr , "Asdasd");

// }
// console.log(this.array_move(da , arr[1] , arr[0]), "Asdasdashdkasgdjhasgdjhasgajhg");
// const p =JSON.stringify(this.invoiceValues);
// this.messageService.add({severity:'success', summary:'File uploaded', detail:'Corrected sequence'});
// setTimeout(() => {
//   alert(p);
// }, 1000);


}
reader.readAsBinaryString(file);

}
else if(extension[0] === 'txt'){
  reader.onload = (ev)=>{
    const data = reader.result;
    const txtData = data.toString();
    console.log(data,"txt data")
  /*   var lines = txtData.split(' ');
    for(var line = 0; line < lines.length; line++){
        console.log(lines[line]);
    } */
    const lines = txtData.trim().split(/\n/g);

    // Split data by spaces (one or more)
    const wordsPerLine = lines.map(line => line.trim().split(/\s+/g));


// First line are the headings
const headings = wordsPerLine.shift();

// Combine lines with heading
const result = wordsPerLine.reduce((all :any, line) => {
  const obj ={};

  line.forEach((word, index) => {
    obj[headings[index]] = word;
  });

  all.push(obj);

  return all;
}, []);

console.log(result);
const updated = this.autoFormatter(this.expectedSequence, result);
console.log(updated , "Asdasda");
this.messageService.add({severity:'success', summary:'File uploaded', detail:'Corrected sequence'});
setTimeout(() => {
  alert(JSON.stringify(updated));
}, 1000);

 };

 reader.readAsText(file)
  }


else
{
  papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (result,file) => {
      console.log(result);
      this.csvArray = result.data;
      const updated = this.autoFormatter(this.expectedSequence , this.csvArray)
  console.log(updated ," csv data");

    }
  });

}
}
autoFormatter(expectedSequence , convArray)
{
  const sortObject = (obj) =>
  Object.fromEntries(
    Object.entries(obj).sort(
      ([a], [b]) => expectedSequence.indexOf(a) - expectedSequence.indexOf(b)
    )
  );
  return convArray.map(sortObject);
}
}
