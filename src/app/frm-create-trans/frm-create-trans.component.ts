import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateTransService } from '../create-trans.service';

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
 
  constructor(private _route : ActivatedRoute , private transService : CreateTransService) {
    this.getProducts();
      
   }
 
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.formID = params['id']
      console.log("URL id has changed")
      this.UserID = sessionStorage.getItem('username');
      this.AccessToken = sessionStorage.getItem('token');
      this.getTransCreation();
      this.getAccounts();
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
