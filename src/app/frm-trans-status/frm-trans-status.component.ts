import { Component, OnInit } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-frm-trans-status',
  templateUrl: './frm-trans-status.component.html',
  styleUrls: ['./frm-trans-status.component.scss']
})
export class FrmTransStatusComponent implements OnInit {
  products: any[] = [];
  selectedProduct: string;
  prePublishChecked: boolean;
  processChecked: boolean;
  showPublish : boolean = false;
  showProcess : boolean = false;
  fetch: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.products = [
      {
        ProName: "UBP-UFONE-POSTPAID",
        ProBehavior: "U",
        ProCode: "9004",
       
      },
      {
        ProName: "Coperate Cheque",
        ProBehavior: "K",
        ProCode: "CPC",
       
      },
      {
        ProName: "Internal Bank Fund Transfer",
        ProBehavior: "B",
        ProCode: "IBFT",
       
      }
    ]
    
    
  }
  OnProductChange(){
    console.log(this.selectedProduct,"selected Product");
    
  }
  prePublish(){
    
    console.log(this.prePublishChecked);
    if(this.prePublishChecked == true){
      this.showPublish = true;
    }
    else if(this.prePublishChecked == false){
      this.showPublish = false;
    }
    else if(this.processChecked == true && this.prePublishChecked == true){
      this.showPublish = true;
      this.showProcess = true;
    }
    else if(this.processChecked == false && this.prePublishChecked == false){
      this.showPublish = false;
      this.showProcess = false;
    }
    else{
      this.showPublish = false;
      this.showProcess = false;
    }
    
  }
  process(){
     
    console.log(this.processChecked);
    
    if(this.processChecked == true){
      this.showProcess = true;
    }
    else if(this.processChecked == false){
      this.showProcess = false;
    }
    else if(this.processChecked == true && this.prePublishChecked == true){
      this.showPublish = true;
      this.showProcess = true;
    }
    else if(this.processChecked == false && this.prePublishChecked == false){
      this.showPublish = false;
      this.showProcess = false;
    }
    else{
      this.showPublish = false;
      this.showProcess = false;
    }
  }
  fetchData(){
    console.log("data fetched");
     this.fetch = true;
  }
  resetData(){
    this.prePublishChecked = false;
    this.processChecked = false;
    this.selectedProduct = null;
    this.showProcess= false;
    this.showPublish = false;
    this.fetch = false;
  }

}
