import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateTransService } from '../create-trans.service';
import { MessageService } from "primeng/api";
import { TemplateService } from "../template.service";
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
    private templateService: TemplateService) {
    
      
   }
   public fields = [];
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.formID = params['id']
      console.log("URL id has changed")
      this.UserID = sessionStorage.getItem('username');
      this.AccessToken = sessionStorage.getItem('token');
      this.getTransCreation();
      this.getAccounts();
      this.getProducts();
      this.getTemplates();
  });
 
  this.products  = [
    
];
this.accounts  = [
 
];
this.templates  = [
  {name: 'New York', code: 'NY'},
  {name: 'Rome', code: 'RM'},
  {name: 'London', code: 'LDN'},
  {name: 'Istanbul', code: 'IST'},
  {name: 'Paris', code: 'PRS'}
];
  }
  ChangingValue() {
    this.getTemplates();
  }
  getTemplates() {
    this.templateService
      .getTemplates()
      .subscribe(res => {
        console.log("Eae", res);
        this.fields = res;
        console.log(this.fields , "fafafa");
         this.transactionArr = this.fields.filter(v => v.MasterDetail == 'O')
         this.invoiceArr = this.fields.filter(v => v.MasterDetail == 'I')
        
        
        this.isValid = true;
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
  getTransCreation() {
    this.transService.getCreateTransaction(this.formID , this.UserID , this.AccessToken ).subscribe(res =>{
      console.log('detail data' , res);
       // this.rawData.push(res.detailData.detail);
        //console.log("RawData" , this.rawData); 
    })
  }
  
  getProducts(){
    this.transService.getProducts().subscribe(res =>{
      //console.log('Products' , res);
      this.products = res;
      console.log('Products Names' , this.products);
    })
  }
  getAccounts(){
    this.transService.getAccounts().subscribe(res =>{
      console.log('Accounts' , res);
      this.accounts = res;
      console.log('Account Names' , this.accounts);
    })
  }
}
