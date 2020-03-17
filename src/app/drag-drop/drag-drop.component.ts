import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { DragDropService } from './drag-drop.service';
import { TemplateCreatorService } from '../template-creator.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { types_dragdrop, Programs_dragdrop } from './drag-drop.model';
 import { of } from 'rxjs';
import { TemplateService } from '../template.service';


@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
  providers: [ConfirmationService]
})
export class DragDropComponent implements OnInit {
  sourceArr: any[];
  types: types_dragdrop[];
  targetArr: any[];
  progtype : Programs_dragdrop;
  program_types: Programs_dragdrop[];
  @Output() onMoveToTarget: EventEmitter<any> = new EventEmitter();
  @Output() onMoveToSource: EventEmitter<any> = new EventEmitter();
  updateArray : any[];
  deleteArary: any [] = [];
  updateReq : boolean;
  deleteReq: boolean;
  displayBasic: boolean;
  displayPosition: boolean;

    position: string;
  constructor(private dataservice:DragDropService,private templateCreator:TemplateCreatorService,
    private messageService:MessageService,
    private templateService:TemplateService,
    private confirmationService: ConfirmationService
    ) {
    this.types = [
      {obj_type : "Enter Text"},
      {obj_type:"text"}

    ]
    this.program_types = [
      {prog_type:"BS"},
      {prog_type:"MS"}

    ]
  }


  getTemp() {
    this.targetArr = []

    this.templateService
      .getTemplates(this.progtype.prog_type)
      .subscribe(res => {

        console.log("Data is here", res);
        if(res != "" || null)
        this.targetArr = res;
        this.getSource();
      });
  }

  ngOnInit(): void {

    this.progtype = this.program_types[0];
    this.getTemp();
      //this.targetCars = [];
  }


  getSource()
  {

    this.dataservice.getData().subscribe(res => {
      this.sourceArr = res
      this.sourceArr = this.sourceArr.filter(val => this.targetArr.every(val1 => val.id !== val1.id));
      console.log(this.sourceArr, "Source array");
    });


  }
 
onMove(){
  //this.sourceCars = this.sourceCars.filter(val=>!this.targetCars.includes(val))

  //var obj = this.targetCars.reduce( ( acc, c ) =>  Object.assign(acc, {[c.id]:c}) , {});

 //  this.targetCars = this.targetCars.filter((item, index) => this.targetCars.indexOf(item) === index);
/*  let filter=[];
   this.targetCars.map(function(item){
     var existItem = filter.find(x=>x.id==item.id);
     if(existItem)
      console.log("item already exist");
     else
      filter.push(item);
   });
   this.targetCars = filter; */
   //
   console.log("asdasd",this.sourceArr);

   }
 /*  sort()
  {
    console.log(of(this.sourceCars.sort((a , b)=> a.name - b.name)));

  } */
  changeValue(){
    this.getTemp();

  }
  updatetable($event)
  {
    this.updateArray = $event.items;
    console.log('updated array',this.updateArray);
    this.updateReq = true;
     this.deleteReq = false;
  }
  deletable($event){
    let arr = [];
    arr =$event.items
   this.deleteArary = [...this.deleteArary , ...arr];
   console.log(this.deleteArary)
   this.deleteReq = true;
  }
  update()
  {
    let obj = {};
    for (let f of this.updateArray)
    {
      obj = f;

      console.log(obj);
      this.templateCreator.updateTemplate(obj , this.progtype.prog_type).subscribe(res =>{
        this.messageService.add({
          severity: "success",
          summary: "Fields added successfully",
          detail: "Field name: " + f.label
        });
        this.updateReq = false
      },(error)=>{
        console.log(error);
        this.messageService.add({
          severity: "error",
          summary: "Template not created",
          detail: "Connection Timed out"
        });
      }
      )
    }

  }
delete(position: string){
  this.position = position;
  this.displayPosition = true;
 
}
rejectDelete(){
  this.displayPosition = false;
  
 this.targetArr = [...this.targetArr , ...this.deleteArary]
  
  console.log(this.targetArr);
  
  this.sourceArr = this.sourceArr.filter(val => this.deleteArary.every(val1 => val.id !== val1.id));
}
confirmdelete()
{
  let obj = {};

  for(let f of this.deleteArary){
    obj = f.id;
    console.log(obj);

      this.dataservice.deleteData(this.progtype.prog_type , obj).subscribe(res =>{
        
        this.messageService.add({
          severity: "success",
          summary: "Fields deleted successfully",
          detail: "Field name: " + f.label
        });
        this.deleteReq = false
      },(error)=>{
        console.log(error);
        this.messageService.add({
          severity: "error",
          summary: "Template not deleted",
          detail: "Connection Timed out"
        });
      }
      )
  }
}
  
ngOnDestroy() {
}
  
  create(){
    let obj = {};
    let newArr ={};
    this.targetArr = this.targetArr.filter(val => this.sourceArr.every(val1 => val.id !== val1.id));
    console.log(this.targetArr);

    for (let f of this.targetArr)
    {
      obj = f;

      console.log(obj);
      this.templateCreator.updateTemplate(obj , this.progtype.prog_type).subscribe(res =>{
        this.messageService.add({
          severity: "success",
          summary: "Fields added successfully",
          detail: "Field name: " + f.label
        });

      },(error)=>{
        console.log(error);
        this.messageService.add({
          severity: "error",
          summary: "Template not created",
          detail: "Connection Timed out"
        });
      }
      )
    }



  }
}
