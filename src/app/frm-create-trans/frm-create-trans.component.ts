import { CreateTransService } from './../create-trans.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from "primeng/api";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from "@angular/forms";
@Component({
  selector: 'app-frm-create-trans',
  templateUrl: './frm-create-trans.component.html',
  styleUrls: ['./frm-create-trans.component.scss']
})
export class FrmCreateTransComponent implements OnInit {
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
  public form: FormGroup;
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
  constructor(private _route : ActivatedRoute , 
    private transService : CreateTransService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
   ) {
    
      
   }
   public fields = [];
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.formID = params['id']
      console.log("URL id has changed")
      this.UserID = sessionStorage.getItem('username');
      this.AccessToken = sessionStorage.getItem('token');
      this.getTransCreation();
     
      this.dynamicForm = this.formBuilder.group({
        tickets: new FormArray([]),
      });
  });
 
  this.products  = [
    
];
this.accounts  = [
 
];
this.templates  = [
 
];
  }
  get f() {
    return this.dynamicForm.controls;
  }
  get t() {
    return this.f.tickets as FormArray;
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
        
        
        this.isValid = true;
      });
  }
  recivemsg(obj){
   
    
    this.invoiceData.push(obj);
    console.log(this.invoiceData,"Invoice saved data");
    this.getuserdata(this.invoiceData);
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
   showDialogToAdd() {
     this.newCar = true;
     this.car = {};
     this.displayDialog = true;
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
