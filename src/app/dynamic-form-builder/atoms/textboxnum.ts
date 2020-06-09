import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password, 
@Component({
    selector: 'textboxnum',
    template: `
      <div [formGroup]="form">
       
        <p-inputNumber *ngIf="field.DataType == 'N'" style="font-weight:500;"  [name]="field?.ColumnName" [formControlName]="field?.ColumnName" [placeholder]= "field.ColumnLabel"></p-inputNumber>
        <p-inputNumber *ngIf="field.DataType == 'C'" style="font-weight:500;" [formControlName]="field.ColumnName"  mode="currency" currency="PKR" locale="en-IN"></p-inputNumber>
        <!-- <textarea *ngIf="field.multiline"  [class.is-invalid]="isDirty && !isValid" [formControlName]="field.name" [id]="field.name"
         class="form-control" [placeholder]="field.placeholder"></textarea> -->
         <!-- <input class="form-control"  [id]="field?.name" [name]="field?.ColumnName" [formControlName]="field?.ColumnName" [placeholder]= "field.ColumnLabel"> -->
      </div> 
      

    `
})
export class TextBoxComponentNum {
    @Input() field:any = {};
    @Input() form:FormGroup;
    get isValid() { return this.form.controls[this.field.ColumnName].valid; }
    get isDirty() { return this.form.controls[this.field.ColumnName].dirty; }
  
    constructor() {

    }
  }
    