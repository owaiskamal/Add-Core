import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from "primeng/api";

// text,email,tel,textarea,password, 
@Component({
    selector: 'file',
    template: `
      <div [formGroup]="form">
       
            
      <p-fileUpload *ngIf="!field.value" name="demo[]" customUpload="true" (uploadHandler)="field.onUpload($event)" 
        multiple="multiple" accept="image/*" maxFileSize="1000000">
    <ng-template pTemplate="content">
        <ul *ngIf="uploadedFiles.length">
            <li *ngFor="let file of uploadedFiles">{{file.name}} - {{file.size}} bytes</li>
        </ul>
    </ng-template>
</p-fileUpload>
</div>


    `,
   /*  styles:[
      
      .drop-container {
        background: #fff;
        border-radius: 6px;
        height: 150px;
        width: 100%;
        box-shadow: 1px 2px 20px hsla(0,0%,4%,.1);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px dashed #c0c4c7;
      }
      p {
        font-size: 16px;
        font-weight: 400;
        color: #c0c4c7; 
      }
      .upload-button {
        display: inline-block;
        border: none;
        outline: none;
        cursor: pointer;
        color: #5754a3;
      }
      .upload-button input {
        display: none;
      }
      .dropzone { 
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column; 
        border-radius: 5px;
        background: white;
        margin: 10px 0;
      }
      .dropzone.hovering {
          border: 2px solid #f16624;
          color: #dadada !important;
      }
      progress::-webkit-progress-value {
        transition: width 0.1s ease;
      }
      
    ] */
})
export class FileComponent {
    @Input() field:any = {};
    @Input() form:FormGroup;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }
    isHovering: boolean;
    uploadedFiles: any[] = [];
    constructor(private messageService: MessageService) {

    }
    

     
  
    toggleHover($event)
    {
      
    }
    ngOnChange(){
      console.log(this.field.value);
      // this.field.value.
    }
}