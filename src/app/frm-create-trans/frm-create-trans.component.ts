import { CreateTransService } from './../create-trans.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from "primeng/api";
import { FormGroup } from '@angular/forms';
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
  /* types: type[]; */
/*   selectedType: type; */
  isValid: boolean = false;
  uploadedFiles: any[] = [];
  displayModal : Boolean;
  modals : any[] = [];
  transactionArr : any[] = [];
  invoiceArr : any[] = [];
  constructor(private _route : ActivatedRoute , 
    private transService : CreateTransService,
    private messageService: MessageService,
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
     
      
  });
 
  this.products  = [
    
];
this.accounts  = [
 
];
this.templates  = [
 
];
  }

  getTemplates(ev) {
    var RequestType = "";
    
    this.transService
      .getTemplates(this.UserID , this.AccessToken , this.formID , RequestType , this.selectedTemplate['ConfCode'])
      .subscribe(res => {
        console.log("Eae", res.detailData.detail);
        // this.fields = res;
        // console.log(this.fields , "fafafa");
        //  this.transactionArr = this.fields.filter(v => v.MasterDetail == 'O')
        //  this.invoiceArr = this.fields.filter(v => v.MasterDetail == 'I')
        
        
        // this.isValid = true;
      });
  }
  recivemsg(obj){
   
    this.modals.push(obj);
  //  this.modals.lastName = obj.lastName;
  //  this.modals.program = obj.program;
  //  this.modals.pest = obj.pest;
   console.log(obj,"whole obj"); 
   this.displayModal = true; 
}
getFields() {
  return this.transactionArr;
}
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
}
