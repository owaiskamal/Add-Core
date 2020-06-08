import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password, 
@Component({
    selector: 'textboxnum',
    template: `
      <div [formGroup]="form">
       
        <input *ngIf="field.DataType == 'N'"  class="form-control" type="number" [name]="field?.ColumnName" [formControlName]="field?.ColumnName" [placeholder]= "field.ColumnLabel"/>
        <p-inputNumber *ngIf="field.DataType == 'C'" [formControlName]="field.ColumnName"  mode="currency" currency="PKR" locale="en-IN"></p-inputNumber>
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
    