import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";

// text,email,tel,textarea,password,
@Component({
  selector: "textboxnum",
  template: `
    <div class="p-fluid p-formgrid p-grid" [formGroup]="form">
      <div class="p-inputgroup p-col-12" >  
        <p-inputNumber
          class=" p-col"
          *ngIf="field.DataType == 'N'"
          [attr.maxLength]="field.MaxLeng"
          [name]="field?.ColumnName"
          [formControlName]="field?.ColumnName"
          [placeholder]="field.ColumnLabel"
        ></p-inputNumber>
        <button
          pButton
          *ngIf="field.ISBTNVERIFY == 'Y'"
          (click)="onSaveData($event)"
          style="font-weight:900;"
          type="button"
          label="verify"
          class="p-button-warning"
        ></button>
      </div>
      <p-inputNumber
        *ngIf="field.DataType == 'C'"
        [attr.maxLength]="field.MaxLeng"
        [formControlName]="field.ColumnName"
        [placeholder]="field.ColumnLabel"
        mode="currency"
        currency="PKR"
        locale="en-IN"
      ></p-inputNumber>

      <!-- <textarea *ngIf="field.multiline"  [class.is-invalid]="isDirty && !isValid" [formControlName]="field.name" [id]="field.name"
         class="form-control" [placeholder]="field.placeholder"></textarea> -->
      <!-- <input class="form-control"  [id]="field?.name" [name]="field?.ColumnName" [formControlName]="field?.ColumnName" [placeholder]= "field.ColumnLabel"> -->
    </div>
  `,
  styles:['p-inputnumber {width : 100% ; font-weight : 500}']
})
export class TextBoxComponentNum {
  @Input() field: any = {};
  @Input() form: FormGroup;
  @Output() saveData = new EventEmitter();
  get isValid() {
    return this.form.controls[this.field.ColumnName].valid;
  }
  get isDirty() {
    return this.form.controls[this.field.ColumnName].dirty;
  }

  constructor() {}
  onSaveData($event) {
    console.log(this.form.getRawValue().BENEACNO, "asdasdasd");
  }
}
