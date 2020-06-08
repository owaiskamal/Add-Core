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
  constructor(private _route : ActivatedRoute , private transService : CreateTransService) {
   
   }
 
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.formID = params['id']
      console.log("URL id has changed")
      this.UserID = sessionStorage.getItem('username');
      this.AccessToken = sessionStorage.getItem('token');
      this.getTransCreation();
  });
 
  this.products  = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
];
this.accounts  = [
  {name: 'New York', code: 'NY'},
  {name: 'Rome', code: 'RM'},
  {name: 'London', code: 'LDN'},
  {name: 'Istanbul', code: 'IST'},
  {name: 'Paris', code: 'PRS'}
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

    })
  }

}
