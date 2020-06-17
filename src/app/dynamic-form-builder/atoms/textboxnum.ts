import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password,
@Component({
    selector: 'textboxnum',
    template: `
      <div class="p-fluid p-formgrid p-grid" [formGroup]="form">

      <div  class="p-field p-col">
        <p-inputNumber class="p-field p-col" *ngIf="field.DataType == 'N'" style="font-weight:500;"  [name]="field?.ColumnName" [formControlName]="field?.ColumnName" [placeholder]= "field.ColumnLabel"></p-inputNumber>
        </div>
        <p-inputNumber *ngIf="field.DataType == 'C'" style="font-weight:500;" [formControlName]="field.ColumnName"  mode="currency" currency="PKR" locale="en-IN"></p-inputNumber>
     <div  class="p-field p-col">
        <button  pButton *ngIf="field.ISBTNVERIFY == 'Y'"  style="font-weight:900;" type="button" label="verify" class="ui-button-rounded  ui-button-warning"></button>
</div>
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
