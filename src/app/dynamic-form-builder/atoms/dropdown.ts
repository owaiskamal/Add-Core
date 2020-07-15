import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "dropdown",
  template: `
    <!-- <div [formGroup]="form">
      <select
      *ngIf="field.IsLookup == 'Y'"
        class="form-control"
        [id]="field?.ColumnName"
        [formControlName]="field?.ColumnName"
      >
        <option *ngFor="let opt of array" [value]="opt.key">{{
          opt
        }}</option>
      </select>
      
    </div> -->
  `,
})
export class DropDownComponent {
  @Input() field: any = {};
  @Input() form: FormGroup;
  array :any[] = []
  constructor() {
    console.log(this.field ,"sdasdasdas");
    
    for(let f of this.field)
    {
      var subMenu = f.LookupVal;
      console.log(f.LookupVal , "drop");
      
      //var array = [];
     this.array = subMenu.split('|');
      console.log(this.array , "dropdowns");
    
    }
  }
}
