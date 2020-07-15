import { style } from '@angular/animations';
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

// text,email,tel,textarea,password,
@Component({
  selector: "textbox",
  template: `
    <div [formGroup]="form">
      <!-- input class="form-control"  [id]="field?.name" [name]="field?.ColumnName" [formControlName]="field?.ColumnName" [placeholder]= "field.ColumnLabel"> -->
      <!-- <textarea *ngIf="field.multiline"  [class.is-invalid]="isDirty && !isValid" [formControlName]="field.name" [id]="field.name"
         class="form-control" [placeholder]="field.placeholder"></textarea> -->

      <input
        type="text"
        *ngIf="field.IsLookup == 'N'"
        style="font-weight:500;"
        [attr.maxLength]="field.MaxLeng"
        [formControlName]="field?.ColumnName"
        [placeholder]="field.ColumnLabel"
        pInputText
      />
      <select
      *ngIf="field.IsLookup == 'Y'"
        class="form-control"
        [id]="field?.ColumnName"
        [formControlName]="field?.ColumnName"
      >
        <option class="option_style" *ngFor="let opt of field.LookupVal.split('|')" [value]="opt">{{
          opt
        }}</option>
      </select>
      
   
     <!--  <p-dropdown *ngIf="field.IsLookup == 'Y'" [options]="field.LookupVal.split('|')" 
        [id]="field?.ColumnName"
        [formControlName]="field?.ColumnName"
      [showClear]="true">
      <ng-template let-item pTemplate="selectedItem">
        <b style="vertical-align:middle">{{item}}</b>
    </ng-template>
    </p-dropdown> -->
     
    </div>
  `,
})
export class TextBoxComponent  {
  @Input() field: any = {};
  
  @Input() form: FormGroup;
  get isValid() {
    return this.form.controls[this.field.ColumnName].valid;
  }
  get isDirty() {
    return this.form.controls[this.field.ColumnName].dirty;
  }
  
  constructor() {
    
   
  }
}
