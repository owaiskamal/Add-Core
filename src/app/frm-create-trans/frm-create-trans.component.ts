import { FrmlistComponent } from './../setup/frmlist/frmlist.component';
import { CreateTransService } from './../create-trans.service';
import { Component, OnInit, ViewChild, ElementRef, enableProdMode, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from "primeng/api";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from "@angular/forms";
import { Dropdown } from 'primeng/dropdown';
@Component({
  selector: 'app-frm-create-trans',
  templateUrl: './frm-create-trans.component.html',
  styleUrls: ['./frm-create-trans.component.scss']
})
export class FrmCreateTransComponent implements OnInit,OnChanges{
  formID: any;
  AccessToken: string;
  UserID: string;
  selectedProduct: string;
  selectedAccount: string;
  selectedTemplate: string;
  products: Object[] = [];
  accounts: Object[] = [];
  templates: Object[] = [];
  rawData :any[] = []
  public invForm = new FormGroup({});
  unsubcribe: any;
  displayDialog: boolean;

  car: any = {};

  selectedCar: any;

  newCar: boolean;

  cars: any[] = [];

  cols: any[]= [];

  /* types: type[]; */
/*   selectedType: type; */
  isValid: boolean = false;
  uploadedFiles: any[] = [];
  displayModal : Boolean;
  modals : any[] = [];
  transactionArr : any[] = [];
  invoiceArr : any[] = [];
  invoiceData: any[] = [];
  invoiceValues: any[] = [];
  totalrecords: number;
  dynamicForm: FormGroup;
  dialogData: any[] = [];
  constructor(private _route : ActivatedRoute , 
    private transService : CreateTransService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
   ) {
    
      
   }
   public fields = [];
   @ViewChild("myDropdown") myDropdown: Dropdown;
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.formID = params['id']
      console.log("URL id has changed")
      this.UserID = sessionStorage.getItem('username');
      this.AccessToken = sessionStorage.getItem('token');
      this.getTransCreation();
      
      
  });
  
  this.products  = [
    
];
this.accounts  = [
 
];
this.templates  = [
 
];

  }
  ngAfterViewInit() {
    this.myDropdown.applyFocus();
  }
  ngOnChanges(){
    
  }
  getTemplates(ev) {
    var RequestType = "";
    
    this.transService
      .getTemplates(this.UserID , this.AccessToken , this.formID , RequestType , this.selectedTemplate['ConfCode'])
      .subscribe(res => {
        console.log("Eae", JSON.parse(res.detailData.detail));
        this.fields = JSON.parse(res.detailData.detail);
        console.log(this.fields , "fafafa");
         this.transactionArr = this.fields.filter(v => v.MasterDetail == 'O')
         this.invoiceArr = this.fields.filter(v => v.MasterDetail == 'I')
         if(this.invoiceArr.length > 0)
         {
           this.createInvoice();

         }
        
        this.isValid = true;
      });
  }
  recivemsg(obj){
   
    
    // this.invoiceData.push(obj);
    // console.log(this.invoiceData,"Invoice saved data");
    // this.getuserdata(this.invoiceData);
}
addInvData()
{
  this.invoiceData.push(this.invForm.getRawValue());
  console.log("INVOICE DATA" , this.invoiceData);
  
 this.getuserdata(this.invoiceData);
 this.invForm.reset()
}
deleteInvData(){
  this.invoiceData = []
}
createInvoice()
{
  this.invoiceArr.forEach(x => {
    this.invForm.addControl(x.ColumnName, new FormControl(x.DefaultValue,Validators.required));
  });
}
getFields() {
  return this.transactionArr;
}

/* getInvoiceFields(){
  return this.invoiceArr;
} */

getuserdata(invoiceDataparam) {

 console.log(invoiceDataparam,"invoice daat param");
    this.invoiceValues = Object.values(invoiceDataparam);
    this.totalrecords = this.invoiceValues.length;
    // this.cols = Object.keys(this.userLists[0]);
    this.cols = [];
    for (var i = 0; i < Object.keys(invoiceDataparam[0]).length; i++) {
      this.cols[i] = {
        header: Object.keys(invoiceDataparam[0])[i],
        field: Object.keys(invoiceDataparam[0])[i]
      };
    }
    console.log(this.totalrecords, "asdasd");

  //  this.userarray.push(this.userList);
}

  //console.log(this.userarray);


OnProductChange($event){
  console.log(this.selectedProduct['ProCode'] , "PRODUCTS");

  var RawAccounts = this.rawData['Account'];
  console.log(this.rawData['Account'] , "data");
  
  this.accounts = RawAccounts.filter((k: { ProCode: any; }) => k.ProCode == this.selectedProduct['ProCode'])

  var RawTemplates = this.rawData['TxnTemplate'];
  if(RawTemplates.filter(k => k.ProCode == this.selectedProduct['ProCode'] ) == '')
  {
    this.templates = this.rawData['TxnTemplate']
  }
  else
  {
    this.templates = RawTemplates.filter(k => k.ProCode == this.selectedProduct['ProCode'] )
  }
  
}
  getTransCreation() {
    this.transService.getCreateTransaction(this.formID , this.UserID , this.AccessToken ).subscribe(res =>{
      console.log('detail data' , JSON.parse(res.detailData.detail));
      this.rawData = JSON.parse(res.detailData.detail);

       // this.rawData.push(res.detailData.detail);
        console.log("RawData" , this.rawData['Products']); 
        this.products = this.rawData['Products'];
         
          

    })
  }
  
  getProducts(){
    
  }
  getAccounts(){
   
  }
   showDialogToAdd(e) {
     this.newCar = true;
     this.car = {};
     this.displayDialog = true;
     console.log(e);
     console.log(this.invoiceValues,"fields data")
     console.log(e.data.keys,"keys")
     this.convert(e.data, e.data.keys);
 }
  convert(object, keys) {
  Object.keys(object).forEach(function (k) {
      if (object[k] && typeof object[k] === 'object') {
          this.convert(object[k], keys);
      }
      if (keys.indexOf(k) !== -1 && !Array.isArray(object[k])) {
          object[k] = [object[k]];
      }
  });
  console.log(object,"Converted object");
  
}

 save() {
   let cars = [...this.cars];
  if (this.newCar)
      cars.push(this.car);
  else
      cars[this.cars.indexOf(this.selectedCar)] = this.car;

   this.cars = cars;
   this.car = null;
   this.displayDialog = false;
 }
 delete() {
   let index = this.cars.indexOf(this.selectedCar);
  this.cars = this.cars.filter((val, i) => i != index);
  this.car = null;
   this.displayDialog = false;
 }



}
