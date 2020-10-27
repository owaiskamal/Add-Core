import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { CreateTransService } from "../create-trans.service";
import { ProgService } from "./prog.service";
import { MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { UserauthService } from "../userauth.service";
import { Dropdown } from "primeng/dropdown";
import * as xlsx from "xlsx";
import { keyframes } from "@angular/animations";
import { interval, Observable } from "rxjs";
import { take } from "rxjs/operators";
import { IfStmt } from "@angular/compiler";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { FileUpload } from "primeng/fileupload";
import { log } from 'console';
@Component({
  selector: "app-frm-bulk-trans",
  templateUrl: "./frm-bulk-trans.component.html",
  styleUrls: ["./frm-bulk-trans.component.scss"],
})
export class FrmBulkTransComponent implements OnInit {
  @Output() onProgress: EventEmitter<any> = new EventEmitter();
  @ViewChild("form") form: FileUpload;
  formID: any;
  uploadProgress: any;
  progress: boolean = false;
  AccessToken: string;
  UserID: string;
  products: Object[] = [];
  accounts: Object[] = [];
  templates: Object[] = [];
  rawData: any[] = [];
  transactionArr: any[] = [];
  invoiceArr: any[] = [];
  expectedSequence: any[] = [];
  jsonArr: any[] = [];
  jsonData: any[] = [];
  selectedProduct: string;
  selectedTemplate: string;
  selectedAccount: string;
  filename: string;
  isValid: boolean = false;
  showbtn: boolean = false;
  fileUpload: boolean = false;
  progressDialog: boolean = false;
  progressValue: number = 0;
  gIndex: number = 0;
  subscription$: any;
  prodUpl: boolean = false;
  accUpl: boolean = false;
  obs: Observable<any>;
  progressNumberSubs: any;
  ind = 0;
  upCompleted: boolean = false;
  showRepeater: boolean = false;
  progressArray: any[] = [];
  cross: boolean = true;
  validatedArr : any[] = [];
  validatedObj : Object = {};
  validatedTableData: any[] = []
  finalTableData: any[] = []
  totalrecords : number;
  cols: any[] = [];
  showTable: boolean = false;
  msgs2: { severity: string; summary: string; detail: string; }[];
  constructor(
    private transService: CreateTransService,
    private messageService: MessageService,
    private logoutService: UserauthService,
    private _route: ActivatedRoute,
    private title: Title,
    private router: Router,
    public cd: ChangeDetectorRef,
    private prgService: ProgService,
    private messageServices: MessageService,
  ) {
    this.progressArray = [
      { msg: "Reading File ", status: false  , error:false},
      { msg: "Processing File", status: false  , error:false},
      { msg: "Validating File", status: false  , error:false},
      { msg: "Uploading File", status: false  , error:false},
    ];
    this.prgService.data.subscribe((datas) => {
      this.progressValue = datas;

      console.log(datas);

      this.cd.markForCheck();
    });
    this.products = [];
    this.accounts = [];
    this.templates = [];
  }
  public fields = [];
  @ViewChild("myDropdown") myDropdown: Dropdown;
  ngOnInit(): void {
    this.cols = [];
    this._route.params.subscribe((params) => {
      this.formID = params["id"];
      var title1 = this._route.snapshot.paramMap.get("title");
      this.title.setTitle("CR-PL - " + title1);
      console.log("URL id has changed");
      this.UserID = sessionStorage.getItem("username");
      this.AccessToken = sessionStorage.getItem("token");

      this.getTransCreation();
    });
  }
  getTransCreation() {
    this.transService
      .getCreateTransaction(this.formID, this.UserID, this.AccessToken)
      .subscribe(
        (res) => {
          if (res.code == "00") {
            console.log(res, "detail data");
            console.log(JSON.parse(res.detailData.detail), "skasyiho");

            this.rawData = JSON.parse(res.detailData.detail);

            // this.rawData.push(res.detailData.detail);
            console.log("RawData", this.rawData["Products"]);
            this.products = this.rawData["Products"];
            //this.delieveredTo = this.rawData["DeliverTo"];
            //console.log(this.delieveredTo,"popup Data")
            // this.popupDropdown = Object.keys(this.delieveredTo)
            //console.log(this.popupDropdown,"popup dropdown");
            //console.log(Object.values(this.delieveredTo),"input fields config");
          } else if (res.code == "-1") {
            this.messageService.add({
              severity: "error",
              summary: "Connection Failed",
              detail: "Session Expired",
            });
            var username = sessionStorage.getItem("username");
            console.log(username, "userNAME");

            this.logoutService.userLogout(username).subscribe((res) => {
              console.log(res);
            });
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("menuitem");

            setTimeout(() => {
              this.router.navigateByUrl("");
            }, 3000);
          }
        },
        (error) => {
          setTimeout(() => {
            this.messageService.add({
              severity: "error",
              summary: "Connection Failed",
              detail: "Template not Found",
            });
          }, 2000);
        }
      );
  }

  getTemplates(ev) {
    var RequestType = "";
    this.transactionArr = [];
    this.invoiceArr = [];
    this.fields = [];
    if (this.selectedTemplate == null) {
      this.selectedAccount = null;
      this.selectedProduct = null;
    } else {
      this.transService
        .getTemplates(
          this.UserID,
          this.AccessToken,
          this.formID,
          RequestType,
          this.selectedTemplate["ConfCode"]
        )
        .subscribe(
          (res) => {
            console.log("Eae", JSON.parse(res.detailData.detail));
            this.fields = JSON.parse(res.detailData.detail);
            console.log(this.fields, "fafafa");
            if (this.fields.length > 0) {
              for (let i = 0; i < this.fields.length; i++) {
                if (this.fields[i]["ColumnName"] == "PRODUCTCODE") {
                  this.prodUpl = true;
                  this.selectedProduct = "";
                }
                if (this.fields[i]["ColumnName"] == "DRACCOUNT") {
                  this.accUpl = true;
                  this.selectedAccount = "";
                }
              }

              this.transactionArr = this.fields.filter(
                (v) => v.MasterDetail == "O"
              );
              this.invoiceArr = this.fields.filter(
                (v) => v.MasterDetail == "I"
              );
              if (this.invoiceArr.length > 0) {
                // this.createInvoice();
                console.log("this.createInvoice() commented");
              }

              this.isValid = true;
              /*    setTimeout(() => {
            if (!this.child.form.valid) {
              this.dynform = false;
            }
          }, 1); */
            } else {
              this.messageService.add({
                severity: "warn",
                summary: "No template found",
              });
            }
          },
          (error) => {
            this.messageService.add({
              severity: "error",
              summary: "Connection Failed",
              detail: "Connection Timed Out",
            });
          }
        );
    }
  }
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
  async onBasicUpload(event: any, form) {
    var ind = 0;
    console.log(event, "event");
    let interval = setInterval(() => {
      if (ind < 15) {
        ind = ind + 5;
        console.log(ind, "15");

        this.prgService.data.next(ind);
      } else if (ind >= 15) {
        this.progressArray[0]["status"] = true;
        console.log("clear 15");

        clearInterval(interval);
      }
    }, 0);

    this.progress = true;

    this.progressDialog = true;

    if (this.progressDialog === true) {
      setTimeout(() => {
        let workBook = null;
        const reader = new FileReader();
        const file = event.files[0];

        this.transactionArr.forEach((element) => {
          this.expectedSequence.push(element["ColumnName"]);
        });
        console.log(this.expectedSequence, " this is exp");

        console.log(file, "file is here");
        var regex = /(xlsx|csv|txt)$/i;
        var extension = regex.exec(file.name);
        this.filename = file.name;

        if (extension[0] === "xlsx") {
          // console.log(extension , "asdasdasdasdasd");

          reader.onload = (ev) => {
            //  console.log(ev , "asdasdad");
            var jsonDATA = [];
            const data = reader.result;
            var listrow = [];
            workBook = xlsx.read(data, { type: "array", cellDates: true });
            var sheet = workBook.Sheets[workBook.SheetNames[0]];
            // console.log(sheet,"sheet");

            var range = xlsx.utils.decode_range(sheet["!ref"]); // get the range
            for (var R = range.s.r; R <= range.e.r; ++R) {
              var list = [];


              for (var C = range.s.c; C <= range.e.c; ++C) {
                //console.log(this.transactionArr[C],"this.transactionArr[C]");

                if (this.transactionArr[C] === undefined) {
                  //   console.log("your work is done");
                } else {
                  var seq = parseInt(this.transactionArr[C].SEQ) - 1;
                  //console.log('Column : ' + C);
                  var cellref = xlsx.utils.encode_cell({ c: seq, r: R }); // construct A1 reference for cell
                  // console.log(cellref,"cellref");
                  var cell = sheet[cellref];


                  if (cell === undefined) {
                    //  console.log("working");
                    list.push("");
                  } else {
                    list.push(cell.v);
                  }
                }
              }
              // console.log(list , "this is list");

              listrow.push(list);


              listrow[R] = Object.assign(
                {},
                ...Object.entries(listrow[R]).map(([, prop], index) =>
                  this.expectedSequence[index] == undefined
                    ? console.log("this")
                    : { [this.expectedSequence[index]]: prop }
                )
              );
              // console.log(this.jsonArr[i] , "this is after");

              jsonDATA.push(listrow[R]);

              var keyObj = Object.keys(jsonDATA[R]);
              var keyVal = Object.values(jsonDATA[R]);

              jsonDATA[R]["Status"] = "Success";
              for (let [index, x] of keyObj.entries()) {
                if (
                  this.transactionArr[index].Mandatory === "Y" &&
                  keyVal[index] == ""
                ) {
                  jsonDATA[R]["Status"] = x + " is Mandatory";
                  break;
                }
                if (
                  keyVal[index].toString().length >
                    parseInt(this.transactionArr[index].MaxLeng) ||
                  keyVal[index].toString().length <
                    parseInt(this.transactionArr[index].MinLeng)
                ) {
                  jsonDATA[R]["Status"] =
                    x +
                    " Provided value should be between " +
                    this.transactionArr[index].MinLeng +
                    " and " +
                    this.transactionArr[index].MaxLeng;
                  break;
                }

                switch (this.transactionArr[index].DataType) {
                  case "N":
                    try {
                      //int.Parse(sValidateVal);
                      parseInt(keyVal[index].toString());
                    } catch (Exception) {
                      jsonDATA[R]["Status"] =
                        x + " Provided value is not numeric";
                    }
                    break;
                  case "C":
                    try {
                      //int.Parse(sValidateVal);
                      this.isDouble(keyVal[index]);
                    } catch (Exception) {
                      jsonDATA[R]["Status"] =
                        x + " Provided value is not currency";
                    }
                    break;

                  default:
                    break;
                }
              }
            }

            if (jsonDATA.length > 0) {
              ind = 25;
              let interval = setInterval(() => {
                if (ind >= 25 && ind <= 50) {
                  ind = ind + 5;
                  console.log(ind, "55");
                  this.prgService.data.next(ind);
                }

                if (ind >= 50) {
                  this.progressArray[1]["status"] = true;

                  console.log("clear 50");

                  clearInterval(interval);
                }
              }, 500);
            }
            console.log("seq comp");

            this.jsonData = jsonDATA;
            if (this.jsonData.length > 0) {
              ind = 50;
              let interval = setInterval(() => {
                if (ind >= 50 && ind <= 75) {
                  ind = ind + 5;
                  console.log(ind, "75");

                  this.prgService.data.next(ind);

                  this.ind = ind;
                }

                if (ind >= 75) {
                  this.progressArray[2]["status"] = true;
                  console.log("clear 75");
                  this.submitBulk();
                  clearInterval(interval);
                }
              }, 500);
            }
            console.log(this.jsonData, "changed header");

            // this.progress = false;
            //this.progressDialog = false;
          };

          reader.readAsArrayBuffer(file);
          
        }

        //this.messageService.add({severity: 'info', summary: this.filename, detail: 'File is ready to Upload'});
        else {
          console.log("not working !!!!!!");
        }
      }, 200);
    }
  }

  isDouble(n) {
    return Number(n) === n && n % 1 !== 0;
  }

  clearSelected() {
    this.jsonData = [];
  }
  
  next() {
    this.progressDialog = false;
    this.showRepeater = true;
    this.progressValue = 0;
    this.progressArray = [
      { msg: "Reading File ", status: false  , error:false},
      { msg: "Processing File", status: false  , error:false},
      { msg: "Validating File", status: false  , error:false},
      { msg: "Uploading File", status: false  , error:false},
    ];
  }
  preview(){
    this.showTable = true
  }

  submitBulk() {
    var finalDAta = this.jsonData.shift();

    var master = {
      UserID: this.UserID,
      AccessToken: this.AccessToken,
      FormID: this.formID,
      Company_Code: "",
      Product_Code: this.selectedProduct["ProCode"],
      ProBehavior: this.selectedProduct["ProBehavior"],
      DrAccount: this.selectedAccount["AC"],
      TempConfigID: this.selectedTemplate["ConfCode"],
      FileNme: this.filename,
      data: this.jsonData,
    };

    console.log(master, "master obj");

    this.convertToString(master);
    this.transService.postBulkTransaction(master).subscribe((res) => {
      console.log(res);
      if (res["code"] == "00") {
        var ind = this.ind;
        let interval = setInterval(() => {
          if (ind >= 75 && ind <= 100) {
            this.upCompleted = true;
            ind = ind + 5;


            this.form.clear();
            this.prgService.data.next(ind);
          }

          if (ind >= 100) {
            this.progressArray[3]["status"] = true;
            console.log("clear 100");

            clearInterval(interval);
          }
        }, 100);
        this.messageService.add({
          severity: "success",
          summary: res["description"],
         detail: "File Uploaded Successfully",
        });
        console.log(JSON.parse(res["detailData"]["detail"]),"validated ata")
        this.validatedArr = JSON.parse(res["detailData"]["detail"]);
         this.validatedTableData = this.validatedArr['data']
         console.log(this.validatedTableData,"data ready for table");
        
          this.finalTableData = Object.values(this.validatedTableData);
       
    
     console.log(this.finalTableData,"values for table");
    
     this.totalrecords = this.finalTableData.length;
   /*   for(let i=0;i< this.finalTableData.length;i++){
      for (var propName in this.finalTableData[i]) { 
        if (this.finalTableData[i][propName] === "") {
         
          
           delete this.finalTableData[i][propName];
        }
      }
      
     } */
     console.log(this.finalTableData,"clean");
     // this.cols = Object.keys(this.userLists[0]);
     this.cols = [];
     console.log(Object.keys(this.validatedTableData[0]),"table keys");
      var colKeys = Object.keys(this.finalTableData[0])

      this.cols = [
        { field: "file_name", header: "File name" },
        { field: "product_name", header: "Product Name" },
        { field: "txnrefno", header: "Cust-Ref#" },
        { field: "benefname", header: "Bene Name" },
        { field: "benecell", header: "Bene Cell" },
        { field: "transactionamount", header: "Amount" },
        { field: "status", header: "Status" },
      ];
    /*  this.cols = colKeys.map((o) => ({
      header : o,
      field : o
      }))
      console.log(this.cols,"cols") */
 
  
        
        this.validatedObj = {
          Filename: this.filename,
          totalRecord: this.validatedArr['TotalRecord'],
          totalSuccess: this.validatedArr['TotalSuccess'],
          totalFailed: this.validatedArr['TotalFailed'],
          successAmount: this.validatedArr['SuccessAmunt'],
          failedAmount: this.validatedArr['FailedAmount'],
        }
        console.log(this.validatedObj,"validatedObj");
        
        this.selectedProduct = "";
        this.selectedAccount = "";
        this.selectedTemplate = "";
        this.jsonData = [];
        this.showbtn = true;
       
      }
      if(res["code"] == "-1"){

        this.msgs2 = [
          {severity:'info', summary:"Error", detail:res["description"]}
      ];
      this.progressArray[3]["error"] = true;
      this.cross = false;
      this.upCompleted = true;
        /* this.messageService.add({
          severity: "info",
          summary: "Error",
          detail: res["description"],
        }); */
      }
    },
    (error)=>{
      console.log(error);
      this.progressArray[3]["error"] = true;
      this.cross = false;
      this.upCompleted = true;
      this.msgs2 = [
        {severity:'info', summary:error.name, detail:error.message}
    ];
    }
   
    );
  }
  reset() {
    this.selectedProduct = "";
    this.selectedAccount = "";
    this.selectedTemplate = "";
    this.jsonData = [];
    this.clearSelected();
  }
  rollBack(){
     let userAction = "ROL";
     let rolObj = {
      UserID: this.UserID,
      AccessToken: this.AccessToken,
      FormID: this.formID,
      FileName: this.filename,
      UserAction: userAction,
      TxnTD: "",
      SubmitType: "F",
     }
     this.transService.postSubRoll(rolObj).subscribe(res=>{
       console.log(res,"rolled back");
       if(res["code"]=="00"){
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: res["description"],
        });
        this.selectedProduct = "";
        this.selectedAccount = "";
        this.selectedTemplate = "";
       }
       if(res["code"]=="-1"){
        this.messageService.add({
          severity:'danger', 
          summary:"Error", 
          detail:res["description"]
        })
       }
     },
     (error)=>{
      this.messageService.add({
        severity:'info', 
        summary:error.name, 
        detail:error.message
      });
     }
     )
  }

  submit(){
    let userAction = "SUB";
    let subObj = {
     UserID: this.UserID,
     AccessToken: this.AccessToken,
     FormID: this.formID,
     FileName: this.filename,
     UserAction: userAction,
     TxnTD: "",
     SubmitType: "F",
    }
    this.transService.postSubRoll(subObj).subscribe(res=>{
      console.log(res,"submitted");
      if(res["code"]=="00"){
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: res["description"],
        });
     
       }
       if(res["code"]=="-1"){
        this.messageService.add({
          severity:'danger', 
          summary:"Error", 
          detail:res["description"]
        })
       }
    },
    (error)=>{
      this.messageService.add({
        severity:'info', 
        summary:error.name, 
        detail:error.message
      });
     }
    )

  }
  convertToString(obj) {
    Object.keys(obj).forEach((i) => {
      if (typeof obj[i] === "object") {
        return this.convertToString(obj[i]);
      }
      obj[i] = "" + obj[i];
    });
    return obj;
  }

}
