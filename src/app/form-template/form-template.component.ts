import { Component, OnInit, OnChanges } from "@angular/core";
import { type } from "../object-form/object-form.model";
import { FormGroup, FormControl } from "@angular/forms";
import { MessageService } from "primeng/api";
import { TemplateService } from "../template.service";
import { Subject } from "rxjs";
import { Modala } from './form.models';

@Component({
  selector: "app-form-template",
  templateUrl: "./form-template.component.html",
  styleUrls: ["./form-template.component.scss"]
})
export class FormTemplateComponent implements OnInit {
  public form: FormGroup;
  unsubcribe: any;
  types: type[];
  selectedType: type;
  isValid: boolean = false;
  uploadedFiles: any[] = [];
  displayModal : Boolean;
  modals : any[] = [];
  
  constructor(
    private messageService: MessageService,
    private templateService: TemplateService
  ) {
    this.types = [{ obj_type: "BS" }, { obj_type: "MS" }];
  }
  public fields = [];

  ngOnInit() {
    this.selectedType = this.types[1];
    this.getTemplates();
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      this.messageService.add({
        severity: "info",
        summary: "File Uploaded",
        detail: file.name
      });
    }

    console.log("eee", event);
  }
  ChangingValue() {
    this.getTemplates();
  }

  getTemplates() {
    this.templateService
      .getTemplates(this.selectedType.obj_type)
      .subscribe(res => {
        console.log("Eae", res);
        this.fields = res;
        this.isValid = true;
      });
  }
  recivemsg(obj){
   
      this.modals.push(obj);
    //  this.modals.lastName = obj.lastName;
    //  this.modals.program = obj.program;
    //  this.modals.pest = obj.pest;
     console.log(obj,"whole obj"); 
     this.displayModal = true; 
 }
  getFields() {
    return this.fields;
  }
  clearModal(){
    
    this.modals = [];
    this.displayModal = false;
     
  }
}
