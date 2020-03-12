import { Component, OnInit } from '@angular/core';
import { type } from '../object-form/object-form.model';
import { TemplateCreatorService } from '../template-creator.service';
import { Programs, types } from './template-creator.model';
import { MessageService } from 'primeng/api';
//import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { FormBuilder } from '@angular/forms';

import {Validators,FormControl,FormGroup} from '@angular/forms';
@Component({
  selector: 'app-template-creator',
  templateUrl: './template-creator.component.html',
  styleUrls: ['./template-creator.component.scss'],
  

})
export class TemplateCreatorComponent implements OnInit {
  userform:FormGroup;
  types: types[]; 
  program_types: Programs[];
  //checked: boolean;
  name: string;
  placeholder: string;
  value: string = "";
  label: string;
  datatype : types;
  progtype : Programs;


  
  constructor(private templateCreator : TemplateCreatorService, private fb:FormBuilder,private messageService:MessageService) {
    this.types = [
      {obj_type : "Enter Text"},
      {obj_type:"text"}
      
    ]
    this.program_types = [
      {prog_type:"BS"},
      {prog_type:"MS"}

    ]
   }
  ChangingValue() {
   

   
  }

  
  // addTemplate()
  // {
    
  //   //console.log(this.drop.obj_type)
  //   const obj = {
  //     id : "",
  //     type : this.datatype.obj_type,
  //     required : this.checked,
  //     name : this.name,
  //     placeholder : this.placeholder,
  //     value : this.value,
  //     label : this.label
  //   }

  //   console.log("Asd" , this.progtype.prog_type);
    
  //   this.templateCreator.updateTemplate(obj , this.progtype.prog_type).subscribe(res =>{
  //     console.log("DOne Popsd",obj);
      
  //   })
  // }
  onSubmit(value: string){
   const obj =
   {
    id : "",
    type : this.userform.value.datatype.obj_type,
    required : this.userform.value.touched,
    name : this.userform.value.name,
    placeholder : this.userform.value.placeholder,
    value : "",
    label : this.userform.value.label,
    order: this.userform.value.sequence
   }
    
    this.templateCreator.updateTemplate(obj , this.progtype.prog_type).subscribe(res =>{
      this.messageService.add({
        severity: "success",
        summary: "Template created Successfully",
        //detail: "Check Dynamic Forms"
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
  ngOnInit() {
    this.datatype = this.types[0];
    this.progtype = this.program_types[0];
    this.userform = this.fb.group({
      'name': new FormControl('', Validators.required),
      'placeholder': new FormControl('', Validators.required),
      'label': new FormControl('', Validators.required),
      'datatype': new FormControl(''),
      'touched': new FormControl('', Validators.required),
      'sequence': new FormControl('')
  });
  }

}
