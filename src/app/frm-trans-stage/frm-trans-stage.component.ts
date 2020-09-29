import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {TransStageService} from "./../trans-stage.service";
import { element } from 'protractor';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { log } from 'console';
import { ThrowStmt } from '@angular/compiler';
import { LoginPageComponent } from '../login-page/login-page.component';

@Component({
  selector: 'app-frm-trans-stage',
  templateUrl: './frm-trans-stage.component.html',
  styleUrls: ['./frm-trans-stage.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class FrmTransStageComponent implements OnInit {
  @ViewChild('op', { static: true }) opt: ElementRef;
  rawData: any[] = [];
  filesMaster: any[] = [];
  filesTables: any[] =[];
  pageIndex: any;
  gpageIndex:any;
  formID: any;
  UserID: string;
  indexOfView : any;
  AccessToken: string;
  tableDisabled: boolean;
  checkedTrans: boolean;
  applyChecked: boolean;
  prev: any[] = [];
  constructor(
    private _route: ActivatedRoute,
    private title: Title,
    private checkerService: TransStageService,
    private messageService: MessageService, private confirmationService: ConfirmationService
  ) {
    this.transActions= [
      {name: 'Authorize', code: 'A'},
      {name: 'Reject All', code: 'R'},
      {name: 'Hold', code: 'H'},
      {name: 'Send to repair' , code : 'S'}
     ];
     this.fileActions = [
      {name: 'Authorize', code: 'A'},
      {name: 'Reject All', code: 'R'},
      {name: 'Hold', code: 'H'},
      {name: 'Send to repair' , code : 'S'}
     ];
  }
  transActions:any[] = []
  fileActions: any;
  files:any[] = []
  selectedTransactions: any[] = [];
  fileComments : any;
  productDialog: boolean;
  transDialog: boolean;
  filesArray:any[] = [];
  cols: any[] = [];
  filesData :any[] =[];
  selectedfilesData :any[] =[];
  selectedActionByTrans: any[] = []
  totalrecords: number;
  gtotalRecords2: number;
  preSelectFile: any;
  filesDropdown :any  = {};
  actionData: any[] = [];
  actionDataByFile: any = {};
  trnasComments:any[] = [];
  gtrnasComments:any[] = [];
  commentsArr:any[] = [];
  fileOpts: boolean;
  visibleSidebar1;
  fileView: any;
  submitted: boolean;
  selectedAction: any[] =[];
  actionByFile: any;
  first: number = 0;
  selectedFile : any
  gFileView : any;
  selectedCounter : any = 0;
  //totalRecords: number = 120;

  totalRecords2: number;
  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.formID = params["id"];
      this.cols = [];
      this.UserID = sessionStorage.getItem("username");
      this.AccessToken = sessionStorage.getItem("token");
      var title1 =this._route.snapshot.paramMap.get('title')
        this.title.setTitle("CR-PL - " +title1);
     this.getFilesData();
    })

  }
  authAll()
  {
    console.log(this.fileActions , "Auth All");

  }
  getFilesData(){

    this.checkerService.getFiles(this.formID , this.UserID , this.AccessToken).subscribe(res=>{
    console.log(res,"files data")
    this.filesMaster = JSON.parse(res.detailData.detail);
    this.files = Object.keys(this.filesMaster);

console.log(this.files,"filesn");

    console.log(this.filesMaster,"filesnames");
    this.filesDropdown = this.files.map((o) => ({
      name : o,
      value : o
      }))
      console.log(this.filesDropdown,"raw data");
       this.preSelectFile =this.filesDropdown[0];
       console.log(this.preSelectFile , "pre-select");
      this.selectedFiles(this.preSelectFile , this.opt);
    })
  }
  tableAction(){
    this.selectedActionByTrans = []
    this.selectedTransactions = []
  }
  transactionAction(){
    this.fileComments = "";
    this.actionByFile = null;
  }
  resetFileData(){
    this.selectedActionByTrans = []
    this.selectedTransactions = []
    this.fileComments = "";
    this.actionByFile = null;
    this.applyChecked = false;
    this.selectedCounter = 0;
  }
  onDropChange(index)
  {
    var prevD = []
    this.prev.push(index);
    if(this.selectedActionByTrans[index] != null && this.applyChecked == true)
    {
      console.log("it is applied");
      this.prev.push(index);
    }

    console.log( this.prev);

      if(this.selectedActionByTrans[index]  == null)
      {
        this.prev = []
        this.selectedCounter = this.selectedCounter -1;

      }
      else if (this.prev.length >= 1)
      {
        if(this.prev[index] == index)
          console.log("this is workihng");

      }
      else
      {
        this.selectedCounter = this.selectedCounter +1;

      }

  }
  viewDetails(transaction,index) {
    console.log(index , "data index");
    this.pageIndex = index
    this.fileView = {...transaction};
    console.log(this.fileView,"transaction");
    this.productDialog = true;

   for (let i = 0; i < Object.keys(this.fileView).length; i++) {


    this.filesData[i] = {
     key : Object.keys(this.fileView)[i],
     value : Object.values(this.fileView)[i]

    };
  }

     console.log(this.filesData,"file data data");

}
viewSelected(){

  if(this.selectedTransactions.length > 0)
  {
    this.transDialog = true
    this.gtotalRecords2 = this.selectedTransactions.length;
    this.gpageIndex = 0;
    console.log(this.selectedTransactions,"selected trans");


    for (let i = 0; i < Object.keys(this.selectedTransactions[0]).length; i++) {


      this.selectedfilesData[i] = {
       key : Object.keys(this.selectedTransactions[0])[i],
       value : Object.values(this.selectedTransactions[0])[i]

      };
    }
    console.log(this.selectedfilesData,"file selected");
  }

}
addComments(){

console.log(this.trnasComments,"comments arr");

}

gaddComments(){
  if(this.applyChecked === true){
    console.log(this.selectedTransactions,"checkbox value");

    for(let i =1 ;i <this.selectedTransactions.length; i++){
        this.selectedActionByTrans[i] = this.selectedActionByTrans[0];
        this.gtrnasComments[i] = this.gtrnasComments[0];

        if(this.selectedActionByTrans[i]  == null)
        {

          this.selectedCounter = this.selectedCounter - 1;
        }
        else
        {
          this.selectedCounter = this.selectedTransactions.length;
        }
    }

    console.log(this.selectedActionByTrans , "this is all apply");

  }
  }
hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}

onPageChange(event) {


  console.log(this.filesTables[event.first],"paginator trans");
  this.trnasComments[event.first];
  this.pageIndex = event.first;

  for (let i = 0; i < Object.keys(this.filesTables[event.first]).length; i++) {


    this.filesData[i] = {
     key : Object.keys(this.filesTables[event.first])[i],
     value : Object.values(this.filesTables[event.first])[i]

    };


  }
}
gonPageChange(event){
  this.prev = []
    console.log(this.selectedTransactions[event.first]);
    this.gpageIndex = event.first;
    console.log(this.selectedActionByTrans , "data drop");

    for (let i = 0; i < Object.keys(this.selectedTransactions[event.first]).length; i++) {


      this.selectedfilesData[i] = {
       key : Object.keys(this.selectedTransactions[event.first])[i],
       value : Object.values(this.selectedTransactions[event.first])[i]

      };


    }
    console.log(this.selectedfilesData,"file selected");
}

  selectedFiles(event,element){
   element.hide();
   this.resetFileData();
   this.filesArray =[]
   var filesArray = []
   var filesTables = [];
   this.selectedFile = ""
   if(event.value.name == undefined)
   {

    this.selectedFile = event['value'];
    console.log(event['value'] , "this is pre-selected ");
   }
   else
   {
    this.selectedFile = event.value.name;
    console.log(this.selectedFile , "this is event ");
   }

   var filesArray = []
  filesArray = this.filesMaster[this.selectedFile];
  console.log(filesArray,"filesArray");

  /*  */


  this.checkerService.getTransDetails(this.formID , this.UserID , this.AccessToken,this.selectedFile)
  .subscribe(res=>
    {
      console.log(JSON.parse(res.detailData.detail),"tans data");
      var filesTables = [];
      var parserArray = []
      parserArray = JSON.parse(res.detailData.detail);
      filesTables = parserArray['Data'];

      console.log(filesTables , "files Tables");
/*     console.log(filesTables['Transaction'],"filesTables['Transaction']")
       */

      this.filesTables = filesTables;
      this.totalRecords2 = this.filesTables.length;
      //this.totalrecords = this.filesTables.length;
      this.cols = [
        {field :'CustRefNo' , header: 'CustRefNo'},
        { field: 'BeneIdent', header: 'BeneIdent' },
        { field: 'BeneName', header: 'BeneName' },
        { field: 'DrAccount', header: 'DrAccount' },
        { field: 'TxnAmount', header: 'TxnAmount' },







      ];

    })



   for (let i = 0; i < Object.keys(filesArray).length; i++) {
    this.filesArray[i] = {
     key : Object.keys(filesArray)[i],
     value : Object.values(filesArray)[i]

    };
  }

  console.log(filesArray,"file array");

    console.log("Selected file",this.filesTables);
  }
  submitData(){
    var array = [];
    var sarray = []
    var carray = []

    console.log(this.selectedActionByTrans,"selected action by file")
    if(this.selectedActionByTrans.length > 0){
    this.selectedActionByTrans.forEach((element,index) => {
      console.log(index,"file indx");
      console.log(element,"file elemr");
      console.log(this.filesTables[index],"file index")
      sarray.push(element.code)
      array.push(this.filesTables[index])
      console.log(array,"file tables array");

      carray.push(this.trnasComments[index]);

    });

    console.log(array,"chek array")
   for (let i = 0; i < array.length; i++) {
    if(typeof carray[i] === "undefined"){
        carray[i] = "";
    }

    this.actionData[i] = {

      File : this.selectedFile,
     UserAction : sarray[i],
     TXN_ID : array[i].TxnID,
     Remarks : carray[i],
     SubmitType : "T"

    }
    console.log(this.actionData,"final data")
  }
}
else{
  console.log("action by file");

  this.actionDataByFile  = {
     File: this.selectedFile,
     UserAction : this.actionByFile.code,
     TXN_ID : "",
     Remarks : this.fileComments,
     SubmitType : "F"
  }
}
    console.log(this.actionDataByFile,"final data")

  }

}
