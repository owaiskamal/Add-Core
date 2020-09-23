import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {TransStageService} from "./../trans-stage.service";
import { element } from 'protractor';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { log } from 'console';
import { ThrowStmt } from '@angular/compiler';

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
  formID: any;
  UserID: string;
  indexOfView : any;
  AccessToken: string;
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
      {name: 'Authorize', code: 'Authorize'},
      {name: 'Reject All', code: 'Reject All'},
      {name: 'Hold', code: 'Hold'},
      {name: 'Send to repair' , code : 'Send to Repair'}
     ];
  }
  transActions:any[] = []
  fileActions: any;
  files:any[] = []
  productDialog: boolean;
  filesArray:any[] = [];
  cols: any[] = [];
  filesData :any[] =[];
  selectedActionByTrans: any[] = []
  totalrecords: number;
  preSelectFile: any;
  filesDropdown :any  = {};
  actionData: any[] = [];
  trnasComments:any[] = [];
  commentsArr:any[] = [];
  fileOpts: boolean;
  visibleSidebar1;
  fileView: any;
  submitted: boolean;
  selectedAction: any[] =[];
  actionByFile: any;
  first: number = 0;
  selectedFile : any
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
    this.filesMaster = res;
    this.files = Object.keys(res);


    console.log(this.files,"filesnames");
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
addComments(){

console.log(this.trnasComments,"comments arr");

}
hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}

onPageChange(event) {
  this.first = event.first;
  console.log(this.first,"first");
  console.log(this.filesTables[event.first],"paginator trans");
  this.filesData = [];

  for (let i = 0; i < Object.keys(this.filesTables[event.first]).length; i++) {


    this.filesData[i] = {
     key : Object.keys(this.filesTables[event.first])[i],
     value : Object.values(this.filesTables[event.first])[i]

    };
  }
}

refresh() {
  this.first = 0;
}
  selectedFiles(event,element){
   element.hide();
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
  var filesTables = [];

  filesTables = filesArray[1];

  console.log(filesTables , "files Tables");
console.log(filesTables['Transaction'],"filesTables['Transaction']")
  this.filesTables = filesTables['Transaction'];
  this.totalRecords2 = this.filesTables.length;
  //this.totalrecords = this.filesTables.length;
  this.cols = [
    { field: 'BeneName', header: 'BeneName' },
    { field: 'trans_id', header: 'trans_id' },
    {field :'txnrefno' , header: 'txnrefno'},


  ];



   for (let i = 0; i < Object.keys(filesArray[0]).length; i++) {
    this.filesArray[i] = {
     key : Object.keys(filesArray[0])[i],
     value : Object.values(filesArray[0])[i]

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
    this.selectedActionByTrans.forEach((element,index) => {
      console.log(index,"file indx");
      console.log(element,"file elemr");
      console.log(this.filesTables[index],"file index")
      sarray.push(element.code)
      array.push(this.filesTables[index]) 
      carray.push(this.trnasComments[index]);
       
    });
    
    console.log(array,"chek array")
   for (let i = 0; i < array.length; i++) {
    this.actionData[i] = {
      File : this.selectedFile,
     UserAction : sarray[i],
     TXN_ID : array[i].trans_id,
     Remarks : carray[i],
     SubmitType : "T"

    }
  }
    console.log(this.actionData,"final data")
   
  }
}
