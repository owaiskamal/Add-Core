import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CreateTransService } from '../create-trans.service';
import {ProgService} from './prog.service'
import { MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { UserauthService } from '../userauth.service';
import { Dropdown } from "primeng/dropdown";
import * as xlsx from 'xlsx';
import { keyframes } from '@angular/animations';
import { interval, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IfStmt } from '@angular/compiler';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-frm-bulk-trans',
  templateUrl: './frm-bulk-trans.component.html',
  styleUrls: ['./frm-bulk-trans.component.scss']
})
export class FrmBulkTransComponent implements OnInit {
  @Output() onProgress: EventEmitter<any> = new EventEmitter();
  formID: any;
  uploadProgress : any;
  progress : boolean = false;
  AccessToken: string;
  UserID: string;
  products: Object[] = [];
  accounts: Object[] = [];
  templates: Object[] = [];
  rawData: any[] = [];
  transactionArr: any[] = [];
  invoiceArr: any[] = [];
  expectedSequence :any[]= []
  jsonArr: any[] = [];
  jsonData: any[] = [];
  selectedProduct: string;
  selectedTemplate: string;
  selectedAccount: string;
  filename: string;
  isValid: boolean = false;
  showSubmit: boolean = false;
  fileUpload: boolean = false;
  progressDialog: boolean = false;
  progressValue: number = 0;
  gIndex: number = 0;
  subscription$: any;
  prodUpl: boolean = false;
  accUpl: boolean = false;
  obs: Observable<any>;
  progressNumberSubs : any
   ind = 0

  constructor( private transService: CreateTransService,
    private messageService: MessageService,
    private logoutService : UserauthService,
    private _route: ActivatedRoute,
    private title : Title,
    private router : Router,
    public cd: ChangeDetectorRef,
    private prgService : ProgService

    ) {
      this.prgService.data.subscribe((datas) =>{



                  this.progressValue =  datas;

                  console.log(datas);

                  this.cd.markForCheck();
                })
    this.products = [];
    this.accounts = [];
    this.templates = [];
  }
  public fields = [];
  @ViewChild("myDropdown") myDropdown: Dropdown;
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
  getTransCreation() {
    this.transService
      .getCreateTransaction(this.formID, this.UserID, this.AccessToken)
      .subscribe((res) => {
        if(res.code == '00')
      {
        console.log( res ,"detail data");
        console.log( JSON.parse(res.detailData.detail) , "skasyiho");

        this.rawData = JSON.parse(res.detailData.detail);

        // this.rawData.push(res.detailData.detail);
        console.log("RawData", this.rawData["Products"]);
        this.products = this.rawData["Products"];
        //this.delieveredTo = this.rawData["DeliverTo"];
        //console.log(this.delieveredTo,"popup Data")
       // this.popupDropdown = Object.keys(this.delieveredTo)
        //console.log(this.popupDropdown,"popup dropdown");
        //console.log(Object.values(this.delieveredTo),"input fields config");
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

  getTemplates(ev) {
    var RequestType = "";
    this.transactionArr = [];
    this.invoiceArr = [];
    this.fields = [];
    if(this.selectedTemplate == null){
      this.selectedAccount = null;
      this.selectedProduct = null;
    }
    else
    {

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
            for(let i =0; i<this.fields.length;i++){
              if(this.fields[i]["ColumnName"] == "PRODUCTCODE" )
              {
                this.prodUpl = true;
                this.selectedProduct = "";

              }
              if(this.fields[i]["ColumnName"] == "DRACCOUNT")
              {
                this.accUpl = true;
                this.selectedAccount = "";
              }
            }


          this.transactionArr = this.fields.filter((v) => v.MasterDetail == "O");
          this.invoiceArr = this.fields.filter((v) => v.MasterDetail == "I");
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
  async onBasicUpload(event : any,form){
    var ind = 0
    console.log(event,"event");
    let interval = setInterval(()=>{
      if(ind < 15)
      {

        ind = ind+5
         console.log(ind , "15");

       this.prgService.data.next(ind);
      }

      else if(ind >= 15)
      {
        console.log("clear 15");

        clearInterval(interval)
      }
    }, 200)

    this.progress = true;
    this.uploadProgress = "Uploading Start...."
    this.progressDialog = true;

    console.log(this.progressDialog);

if(this.progressDialog === true)
{


let workBook = null;
const reader = new FileReader();
const file = event.files[0];

this.transactionArr.forEach(element => {
  this.expectedSequence.push(element['ColumnName'])
});
console.log(this.expectedSequence , " this is exp");

console.log(file,"file is here");
var regex = /(xlsx|csv|txt)$/i
var extension = regex.exec(file.name);
this.filename = file.name;





if(extension[0] === 'xlsx'){
 // console.log(extension , "asdasdasdasdasd");

   reader.onload =  (ev)=>{
//  console.log(ev , "asdasdad");

  const data = reader.result;
  var listrow = [];
  workBook = xlsx.read(data, { type: 'array'  ,cellDates: true });
  var sheet = workBook.Sheets[workBook.SheetNames[0]];
 // console.log(sheet,"sheet");

  var range = xlsx.utils.decode_range(sheet['!ref']); // get the range
  for(var R = range.s.r; R <= range.e.r; ++R){
    var list = [];
    for(var C = range.s.c; C <= range.e.c; ++C){
      //console.log(this.transactionArr[C],"this.transactionArr[C]");

      if(this.transactionArr[C] === undefined){
     //   console.log("your work is done");
      }else{
        var seq  = parseInt(this.transactionArr[C].SEQ) - 1;
        //console.log('Column : ' + C);
        var cellref = xlsx.utils.encode_cell({c:seq , r:R}); // construct A1 reference for cell
       // console.log(cellref,"cellref");
        var cell = sheet[cellref];
        //console.log(cell,"cell");

        if(cell === undefined)
        {

        //  console.log("working");
          list.push("")
        }
        else
        {
          list.push(cell.v)
        }

      }
    }
 // console.log(list , "this is list");


    listrow.push(list)


  }

    if(listrow.length > 0)
    {
     var ind = 15;


     ;

     this.prgService.data.next(25);


    }
   var jsonDATA = []
     // const dataString = JSON.stringify(listrow);
      // console.log(dataString);
      this.jsonArr = listrow
     // console.log(this.jsonArr,"parsed json");

      for(let i = 1; i<this.jsonArr.length;i++){
        //  console.log(    this.jsonArr.length , "datat");

        this.jsonArr[i] = Object.assign({}, ...Object.entries(this.jsonArr[i])
                 .map(([, prop], index) =>(this.expectedSequence[index] == undefined) ? console.log('this')  :
                 ({[this.expectedSequence[index]]: prop})
                 ));
                    // console.log(this.jsonArr[i] , "this is after");

                  jsonDATA.push(this.jsonArr[i]);

                }

                // if(jsonDATA.length > 0)
                // {
                //   console.log(this.ind ,"value");

                //   let interval = setInterval(()=>{
                //     if(this.ind < 50)
                //     {
                //       this.ind = this.ind+5
                //       this.prgService.data.next(this.ind);
                //     }

                //   else if(this.ind >= 50)
                //   {
                //     clearInterval(interval)
                //   }
                // }, 200)
                // }
                console.log("seq comp");





                jsonDATA.forEach((element , tIndex) => {
                 var keyObj = Object.keys(element);
                 var keyVal = Object.values(element);




                        // this.prgService.data.next(tIndex);


                  //this.progressValue =  Math.round((tIndex / (jsonDATA.length-1) ) * 100 );


                  // this.onProgress.emit({[this.progressNumberSubs]: this.progressValue})


              //    let interval = setInterval(() => {
              //     this.progressValue =  Math.round((tIndex / (jsonDATA.length-1) ) * 100 );
              //     if (this.progressValue < 100) {
              //        // this.messageService.add({severity: 'info', summary: 'Success', detail: 'Processing'});
              //         clearInterval(interval);
              //     }
              //     else if (this.progressValue === 100) {

              //       //this.messageService.add({severity: 'info', summary: 'Success', detail: 'Process Completed'});
              //       clearInterval(interval);
              //   }
              // }, 0);





                    //this.progressValue =  Math.round((tIndex / (jsonDATA.length-1) ) * 100 );
                   /*  console.log(this.progressValue , tIndex , "this is prec");

                    if (this.progressValue < 100) {
                      this.uploadProgress = "Validating File...."
                      this.onProgress.emit({progressValue: this.progressValue});
                    }
                    else if (this.progressValue === 100) {
                      this.uploadProgress = "File Ready to upload!!"

                  } */







/*
                 console.log(keyObj,"keyObj");
                 console.log(keyVal,"keyVal");
 */
                  //console.log(tIndex , "outer loop");

                  jsonDATA[tIndex]['Status'] = "Success"
                  for(let [index , x] of keyObj.entries()  )
                  {


                    if(this.transactionArr[index].Mandatory === 'Y' && keyVal[index]== "")
                    {
                      jsonDATA[tIndex]['Status'] = x +" is Mandatory";
                      break;
                    }
                    if(keyVal[index].toString().length > parseInt(this.transactionArr[index].MaxLeng) || keyVal[index].toString().length < parseInt(this.transactionArr[index].MinLeng) )
                    {
                      jsonDATA[tIndex]['Status'] = x + " Provided value should be between " + this.transactionArr[index].MinLeng + " and " + this.transactionArr[index].MaxLeng;
                      break;
                    }


                  switch (this.transactionArr[index].DataType) {
                    case "N":
                      try
                      {
                          //int.Parse(sValidateVal);
                         parseInt(keyVal[index].toString())

                      }
                      catch (Exception)
                      {
                        jsonDATA[tIndex]['Status'] = x + " Provided value is not numeric";
                      }
                      break;
                      case "C":
                        try
                        {
                            //int.Parse(sValidateVal);
                            this.isDouble(keyVal[index])

                        }
                        catch (Exception)
                        {
                          jsonDATA[tIndex]['Status'] = x + " Provided value is not currency";
                        }
                        break;

                      default:
                        break;
                    }

                  }


                   /*  if(this.transactionArr[index].DataType === 'T')
                    {
                      if(typeof(keyVal[index]) != "string")
                      {
                        jsonDATA[tIndex]['Status'] = x +" Data type in incorrect";
                        break;
                      }
                      else {
                        if(this.transactionArr[index].Mandatory === 'Y')
                        {


                          if(keyVal[index] == "")
                          {
                            console.log(index , "empty index");
                            console.log(keyVal);

                           jsonDATA[tIndex]['Status'] = x +" is mandatory"
                            break;

                          }
                          else
                          {
                            jsonDATA[tIndex]['Status'] = "Success"
                          }
                        }
                      }

                    }else if (this.transactionArr[index].DataType === 'C')
                    {
                      if(!this.isDouble((keyVal[index])))
                      {
                        jsonDATA[tIndex]['Status'] = x +" Data type in incorrect";
                        break;
                      }
                    }
                    else if (this.transactionArr[index].DataType === "N")
                    {
                      if(typeof(keyVal[index]) != "number")
                      {
                        jsonDATA[tIndex]['Status'] = x +" Data type in incorrect";
                        break;
                      }
                    }
                    else if(this.transactionArr[index].DataType === "T" && this.transactionArr[index].IsLookup === "Y" )
                    {
                      jsonDATA[tIndex]['Status'] ="Success";
                    }
                  */


                  }


                );



              //  this.progressValue =  Math.round((this.gIndex * 100) / (jsonDATA.length-1));

              /*   let interval = setInterval(() => {
                  this.progressValue = this.progressValue + Math.floor(Math.random() * 10) + 1;
                  if (this.progressValue < 100) {
                      this.messageService.add({severity: 'info', summary: 'Success', detail: 'Processing'});
                      clearInterval(interval);
                  }
                  else if (this.progressValue === 100) {

                    this.messageService.add({severity: 'info', summary: 'Success', detail: 'Process Completed'});
                    clearInterval(interval);
                }
              }, 2000); */

               /*                  this.uploadProgress = "Ready to Upload" */
                this.jsonData = jsonDATA;
                // if(this.jsonData.length > 0)
                // {
                //   this.submitBulk();
                //   let interval = setInterval(()=>{
                //     this.ind = this.ind+5
                //   this.prgService.data.next(this.ind);
                //   if(this.ind === 75)
                //   {
                //     clearInterval(interval)
                //   }
                // }, 200)
                // }
                console.log(jsonDATA , "changed header");


               // this.progress = false;
                //this.progressDialog = false;

   }

   reader.readAsArrayBuffer(file);
   this.showSubmit = true;

  }

  //this.messageService.add({severity: 'info', summary: this.filename, detail: 'File is ready to Upload'});




else{
  console.log("not working !!!!!!");

}

}

  }

  isDouble(n)
  {
    return Number(n) === n && n % 1 !== 0;
  }

  clearSelected()
  {
    this.jsonData = [];
  }

  submitBulk(){
    var master =
    {
      UserID:this.UserID,
      AccessToken:this.AccessToken,
      FormID: this.formID,
      Company_Code:"",
      Product_Code:this.selectedProduct["ProCode"],
      DrAccount:this.selectedAccount["AC"],
      TempConfigID:this.selectedTemplate["ConfCode"],
      FileNme:this.filename,
      data: this.jsonData

    }

    console.log(master,"master obj");

    this.convertToString(master);
    this.transService.postBulkTransaction(master).subscribe((res) => {


      console.log(res);
      if(res['code'] == 0){
      //   let interval = setInterval(()=>{
      //     this.ind = this.ind+5
      //   this.prgService.data.next(this.ind);
      //   if(this.ind === 100)
      //   {
      //     clearInterval(interval)
      //   }
      // }, 10)
        this.messageService.add({
          severity: "success",
          summary: res['description'],
          detail: res['detailData']['detail']
           });
           this.selectedProduct = "";
    this.selectedAccount = "";
    this.selectedTemplate = "";
    this.jsonData = []
      }

    })


  }
  reset(){
    this.selectedProduct = "";
    this.selectedAccount = "";
    this.selectedTemplate = "";
    this.jsonData = [];
    this.clearSelected()
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
}
