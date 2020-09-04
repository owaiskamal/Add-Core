import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {TransStageService} from "./../trans-stage.service";
import { element } from 'protractor';
@Component({
  selector: 'app-frm-trans-stage',
  templateUrl: './frm-trans-stage.component.html',
  styleUrls: ['./frm-trans-stage.component.scss']
})
export class FrmTransStageComponent implements OnInit {
  @ViewChild('op', { static: true }) opt: ElementRef;
  rawData: any[] = [];
  filesMaster: any[] = [];
  filesTables: any[] =[];
  constructor(
    private _route: ActivatedRoute,
    private title: Title,
    private checkerService: TransStageService
  ) {
    this.actions = [
      {name: 'Signatory', code: 'NY'},
      {name: 'Authorizer', code: 'RM'},
      {name: 'Releaser', code: 'LDN'},
  ];
  }
  actions:any[] = []
  files:any[] = []
  filesArray:any[] = [];
  cols: any[] = [];
  totalrecords: number;
  selectedCity: any;
  filesDropdown :any  = {};
  cities1: string
  visibleSidebar1;
  selectedCity1: any;
  ngOnInit(): void {
    this.cols = [];
    var title1 =this._route.snapshot.paramMap.get('title')
      this.title.setTitle("CR-PL - " +title1);
   this.getFilesData();
  }

  getFilesData(){
    this.checkerService.getFiles().subscribe(res=>{
    console.log(res,"files data")
    this.filesMaster = res;
    this.files = Object.keys(res);


    console.log(this.files,"filesnames");
    this.filesDropdown = this.files.map((o) => ({
      name : o,
      value : o
      }))
      console.log(this.filesDropdown,"raw data");
       this.selectedCity =this.filesDropdown[0];
       console.log(this.selectedCity , "pre-select");
      this.selectedFile(this.selectedCity , this.opt);
    })
  }
  selectedFile(event,element){
   element.hide();
   this.filesArray =[]
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

  this.filesTables = filesTables['Transactions'];
  //this.totalrecords = this.filesTables.length;
  this.cols = [
    { field: 'CustomeRefNumber', header: 'CustomeRefNumber' },
    { field: 'Amount', header: 'Amount' },
   
  ];



   for (let i = 0; i < Object.keys(filesArray[0]).length; i++) {
    this.filesArray[i] = {
     key : Object.keys(filesArray[0])[i],
     value : Object.values(filesArray[0])[i]

    };
  }
    console.log("Selected file",this.filesTables);
  }
}
