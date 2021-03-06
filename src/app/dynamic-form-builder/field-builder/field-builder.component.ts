import { Component, Input, OnInit } from "@angular/core";
import { Subject } from 'rxjs';

@Component({
  selector: "field-builder",
  template: `
    <div [formGroup]="form" >

      <label
        class="form-control-label"
        [attr.for]="field.ColumnLabel"
        style="font-weight : 700 ;"
      >
        {{ field.ColumnLabel }}
        <strong class="text-danger" *ngIf="field.Mandatory == 'Y'">*</strong>
      </label>

      <div   [ngSwitch]="field.DataType">
        <textbox *ngSwitchCase="'T'"   [field]="field" [form]="form"></textbox>
        
        <textboxnum  *ngSwitchCase="'N'"  [field]="field" [form]="form"></textboxnum>
        <textboxnum *ngSwitchCase="'C'"  [field]="field" [form]="form"></textboxnum>
        <calender *ngSwitchCase="'D'"  [field]="field" [form]="form"></calender>
        <checkbox
          *ngSwitchCase="'checkbox'"
          [field]="field"
          [form]="form"
        ></checkbox>
        <radio *ngSwitchCase="'radio'" [field]="field" [form]="form"></radio>
        <file *ngSwitchCase="'file'" [field]="field" [form]="form"></file>
        <div
          class="alert alert-danger my-1 p-2 fadeInDown animated"
          *ngIf="!isValid && isDirty"
        >
         <div *ngIf="form.controls[field.ColumnName].errors?.required">
          {{ field.ColumnLabel }} is required
        </div>
          <div
          *ngIf="form.controls[field.ColumnName].errors?.minlength"
        >
          Minimum length should be {{ field.MinLeng }} 
        </div>
        </div>
        
      </div>
    </div>
  `
})
export class FieldBuilderComponent {
  @Input() field: any;
  @Input() form: any;


  get isValid() {
    return this.form.controls[this.field.ColumnName].valid;
  }
  get isDirty() {
    return this.form.controls[this.field.ColumnName].dirty;
  }


  constructor() {


  }

}
