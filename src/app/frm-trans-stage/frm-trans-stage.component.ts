import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {TransStageService} from "./../trans-stage.service";
import { element } from 'protractor';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

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
  AccessToken: string;
  constructor(
    private _route: ActivatedRoute,
    private title: Title,
    private checkerService: TransStageService,
    private messageService: MessageService, private confirmationService: ConfirmationService
  ) {
    this.actions = [
      {name: 'Authorize', code: 'Authorize'},
      {name: 'Reject All', code: 'Reject All'},
      {name: 'Hold', code: 'Hold'},
      {name: 'Send to repair' , code : 'Send to Repair'}
     ];
  }
  actions:any[] = []
  files:any[] = []
  productDialog: boolean;
  filesArray:any[] = [];
  cols: any[] = [];
  filesData :any[] =[];

  totalrecords: number;
  preSelectFile: any;
  filesDropdown :any  = {};
  fileActions: boolean;
  visibleSidebar1;
  fileView: any;
  submitted: boolean;
  selectedAction: any[] =[];
  actionByFile: any;
  first: number = 0;

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
      this.selectedFile(this.preSelectFile , this.opt);
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
  selectedFile(event,element){
   element.hide();
   this.filesArray =[]
   var filesArray = []
   var filesTables = [];
   var selectedFile = ""
   if(event.value.name == undefined)
   {

    selectedFile = event['value'];
    console.log(event['value'] , "this is pre-selected ");
   }
   else
   {
    selectedFile = event.value.name;
    console.log(selectedFile , "this is event ");
   }

   var filesArray = []
  filesArray = this.filesMaster[selectedFile];
  var filesTables = [];

  filesTables = filesArray[1];

  console.log(filesTables , "files Tables");

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
}
