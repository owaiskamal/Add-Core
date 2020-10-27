import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { log } from 'console';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment, { months } from 'moment';



@Component({
  selector: 'app-frm-account-statement',
  templateUrl: './frm-account-statement.component.html',
  styleUrls: ['./frm-account-statement.component.scss']
})
export class FrmAccountStatementComponent implements OnInit {
  rangeDates: Date[] = [];
  accountNumbers : any[] = [];
  selectedAccountNo : string;
  statementPeriods : any[] = [];
  accountDetails: any[] = [];
  cols: any[] = [];
  filesTables: any[] = [];
  exportColumns: any[];
  selectedPeriod : string;
  checked: boolean = false;
  showButtonBar: boolean;
  dateRangeDisabled : boolean;
  statementPeriodDisabled : boolean = false;
  closingBalanceDate: any;
  diffDays : number;
  fetch: boolean = false;
  constructor() { 
  
    this.accountNumbers = [
      {name: '305411944-UFONE', code: 'NY'},
      {name: '305411945-PTCL', code: 'RM'},
      {name: '305411946-PTCL', code: 'LDN'},
      {name: '305411947-PTCL', code: 'IST'},
      {name: '305411948-PTCL', code: 'PRS'}
  ];
  this.statementPeriods = [
    {name: 'Last One Week', code: 'LOW'},
    {name: 'Last One Month', code: 'LOM'},
    {name: 'Last Three Month', code: 'LTM'},
    {name: 'Last Six Months', code: 'LSM'},
    {name: 'Last Twelve Months', code: 'TLM'}
];
 
this.accountDetails = [
  {title: 'Account Title', detail: ''},
  {title: 'From Date', detail: ''},
  {title: 'To Date', detail: ''},
  {title: 'Account No', detail: ''},
  {title: 'Opening Balance as on', detail: ''}
]

this.filesTables = [
  {
 
  transactionDate: "10/20/2020",
  particulars: "UBP-MobileApp",
  drcr: "Debit",
  Amount: 10000,
  endBalance: 10000
  
  },
  {
    transactionDate: "11/20/2020",
    particulars: "UBP-MobileApp",
    drcr: "Credit",
    Amount: 2000,
    endBalance: 8000
    
    },
    {
      transactionDate: "12/20/2020",
      particulars: "UBP-MobileApp",
      drcr: "Debit",
      Amount: 3000,
      endBalance: 11000
    
      }

];
this.cols = [
  { field: "transactionDate", header: "Transaction Date" },
  { field: "particulars", header: "Particulars" },
  { field: "drcr", header: "DR/CR" },
  { field: "Amount", header: "Amount" },
  { field: "endBalance", header: "End Balance" },
];

  }

  ngOnInit(): void {
    this.rangeDates = [];
    this.rangeDates[0] = new Date();
    this.dateRangeDisabled = true;
    console.log(this.rangeDates,"range dates on init");
    
  }


  OnAccountChange(){
    console.log(this.selectedAccountNo,"Selected Account");
  
    if (this.selectedAccountNo == null) {
      this.accountDetails[0].detail = null;
      this.accountDetails[3].detail = null;
    } else{
      let accountname = this.selectedAccountNo['name'].split("-")
      console.log(accountname,"accountname");
      this.accountDetails[0].detail = accountname[1];
      this.accountDetails[3].detail = accountname[0];
    }
  }
 
  OnPeriodChange(){
    
    console.log(this.selectedPeriod,"Selected Period");
    
    if(this.selectedPeriod){
     
      
      this.dateRangeDisabled = false;
     /*  this.rangeDates.shift() */
      var periodicDate = new Date()

      console.log(periodicDate,"todaydate");
      
   
       if(this.selectedPeriod['code'] == "LOW"){
         console.log("inside low");
        console.log(periodicDate,"periodic date");
      
         
        
        let lowDate = moment().subtract(7,'d').toDate();
        
        console.log(lowDate,"subt days");
       
        this.rangeDates[1] = periodicDate;
        this.rangeDates[0] = lowDate;
        
        console.log(this.rangeDates);
       let formattedFromDate = this.singleFormatDate(periodicDate)
       let formattedToDate = this.singleFormatDate(lowDate)
        this.accountDetails[1].detail = formattedToDate
        this.accountDetails[2].detail = formattedFromDate
      this.accountDetails[4].detail = formattedToDate
      this.closingBalanceDate = formattedFromDate;
          
        }
        else if(this.selectedPeriod['code'] == "LOM"){
          let lowDate = moment().subtract(1,'months').toDate();
        
          console.log(lowDate,"subt days");
         
          this.rangeDates[1] = periodicDate;
          this.rangeDates[0] = lowDate;
          
          console.log(this.rangeDates);
         let formattedFromDate = this.singleFormatDate(periodicDate)
         let formattedToDate = this.singleFormatDate(lowDate)
          this.accountDetails[1].detail = formattedToDate
          this.accountDetails[2].detail = formattedFromDate
        this.accountDetails[4].detail = formattedToDate
        this.closingBalanceDate = formattedFromDate;
        }
        else if(this.selectedPeriod['code'] == "LTM"){
          let lowDate = moment().subtract(3,'months').toDate();
        
          console.log(lowDate,"subt days");
         
          this.rangeDates[1] = periodicDate;
          this.rangeDates[0] = lowDate;
          
          console.log(this.rangeDates);
         let formattedFromDate = this.singleFormatDate(periodicDate)
         let formattedToDate = this.singleFormatDate(lowDate)
          this.accountDetails[1].detail = formattedToDate
          this.accountDetails[2].detail = formattedFromDate
        this.accountDetails[4].detail = formattedToDate
        this.closingBalanceDate = formattedFromDate;
        }
        else if(this.selectedPeriod['code'] == "LSM"){
          let lowDate = moment().subtract(6,'months').toDate();
        
          console.log(lowDate,"subt days");
         
          this.rangeDates[1] = periodicDate;
          this.rangeDates[0] = lowDate;
          
          console.log(this.rangeDates);
         let formattedFromDate = this.singleFormatDate(periodicDate)
         let formattedToDate = this.singleFormatDate(lowDate)
          this.accountDetails[1].detail = formattedToDate
          this.accountDetails[2].detail = formattedFromDate
        this.accountDetails[4].detail = formattedToDate
        this.closingBalanceDate = formattedFromDate;
        }
        else if(this.selectedPeriod['code'] == "TLM"){
          let lowDate = moment().subtract(12,'months').toDate();
        
          console.log(lowDate,"subt days");
         
          this.rangeDates[1] = periodicDate;
          this.rangeDates[0] = lowDate;
          
          console.log(this.rangeDates);
         let formattedFromDate = this.singleFormatDate(periodicDate)
         let formattedToDate = this.singleFormatDate(lowDate)
          this.accountDetails[1].detail = formattedToDate
          this.accountDetails[2].detail = formattedFromDate
        this.accountDetails[4].detail = formattedToDate
        this.closingBalanceDate = formattedFromDate;
        }
        
  }

  }
  OnDateChange(){
    console.log(this.rangeDates,"rangeDates");
    if(this.rangeDates.length == 0){
      this.clearDate();
    }else{
     
      var returnedDates =  this.formatDate(this.rangeDates[0],this.rangeDates[1])
      this.accountDetails[1].detail = returnedDates['fromDate']
      this.accountDetails[2].detail = returnedDates['toDate']
      this.accountDetails[4].detail = returnedDates['fromDate']
      this.closingBalanceDate = this.accountDetails[2].detail
      
      if(returnedDates['toDate'] == null){
        /* let numToDate = parseInt(toDate);
        let numfromDate = parseInt(fromDate)
        let diffDays =  numToDate - numfromDate
        console.log(diffDays + " days");  */
        console.log( "it is null");
        
      } else{
        console.log("not null here do process");
        
        let numToDate = parseInt(returnedDates['toDate']);
        let numfromDate = parseInt(returnedDates['fromDate'])
        this.diffDays =  numToDate - numfromDate
        console.log(this.diffDays + " days"); 
      } 
     
    }
   
  }

  singleFormatDate(dateToFormat){
    const pipe = new DatePipe("en-US");
    let formattedDate = pipe.transform(dateToFormat, "dd/MM/yyyy");
    return formattedDate;
  }
  formatDate(fromDate,toDate){
    const pipe = new DatePipe("en-US");
    let fromDateFormatted = pipe.transform(fromDate, "dd/MM/yyyy");
    let toDateFormatted = pipe.transform(toDate, "dd/MM/yyyy");
    var returnedDates = {};
    returnedDates["fromDate"] = fromDateFormatted;
    returnedDates["toDate"] = toDateFormatted;
    return returnedDates;
  }
 
  clearDate(){
    this.accountDetails[1].detail = "";
    this.accountDetails[2].detail = "";
    this.accountDetails[4].detail = "";
    this.closingBalanceDate = ""
  }
  changeDateFormat(){

  }
  checkValue(){
    console.log(this.checked);
     if(this.checked == true){
       this.dateRangeDisabled = false;
       this.statementPeriodDisabled = true;
     } 
     else if(this.checked == false){
       this.dateRangeDisabled = true;
       this.statementPeriodDisabled = false;
     }
  }
  Fetch(){
    this.fetch = true;
  }
  resetData(){
 
    
    this.selectedAccountNo = "";
    this.selectedPeriod = "";
    this.rangeDates = null;
    this.closingBalanceDate = ""
    this.checked = false;
    this.accountDetails[0].detail = "";
    this.accountDetails[3].detail = "";
    this.accountDetails[1].detail = "";
    this.accountDetails[2].detail = "";
    this.accountDetails[4].detail = "";
    this.dateRangeDisabled = true;
  
  }

   
  exportPdf() {
    
  
          const doc = new jsPDF();
  
          autoTable(doc,{
           
            showHead: true,
            body: this.filesTables,
           columns: this.cols.map(col => ({title: col.header, dataKey: col.field}))
           
          })
          doc.text("Account Statement", 82, 10);
          doc.save('statement.pdf');
      
  
       
    
}

exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.filesTables);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "statement");
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
}

}
