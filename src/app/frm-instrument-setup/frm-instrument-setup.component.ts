import { Component, OnInit, ViewChild } from '@angular/core';
import { CkeditorService } from 'ngx-ckeditor4';
import { NgxCkeditorComponent } from 'ngx-ckeditor4/ngx-ckeditor.component';

@Component({
  selector: 'app-frm-instrument-setup',
  templateUrl: './frm-instrument-setup.component.html',
  styleUrls: ['./frm-instrument-setup.component.scss']
})
export class FrmInstrumentSetupComponent implements OnInit {
  text: string;
  locale = 'en_us';
  config = {};
  basic = [
    {name: 'document', items: ['Source', '-', 'NewPage', 'Preview', '-', 'Templates']},
    {name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
    {name: 'basicstyles', items: ['Bold', 'Italic']}
  ];
  @ViewChild("ckeditor") edit : NgxCkeditorComponent
  constructor(private ckeditorService: CkeditorService) {


  }
  data =[
    {

      FROMBENE: "Faisal",
      TOBENE: "KKF-0001",
      CHECKNO: "101002",
      DATE : "13-12-2020",
      AMOUNT: "2500",
      AMOUNTINWORDS: "TWENTY FIVE HUNDREDS",
      REFNO: "12",
      IMG1: "data:image/png;base64,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"
  }

  ]
  onclick()
  {


    for (let i = 0; i < this.data.length; i++) {

       var  keyval = Object.values(this.data[i])
        for ( let [index , x] of Object.keys(this.data[i]).entries()) {

          console.log(x , index);
          var re = new RegExp('\\b'+x+'\\b',"g");
          console.log(re,"regular");
          
          this.text =  this.text.replace(re , keyval[index])

        }
    }
    console.log(this.text);

    var data =""
    console.log(this.text);
     var mywindow = window.open('table')
      data = "<html>"
    data += "<head>"
    data += "</head>"
    data += "<body>"
    data += this.text
    data += "</body>"
    data += "</html>"

    mywindow.document.write(data);
    console.log(this.data);


  }

  ngOnInit(): void {
    this.ckeditorService.fileUploadRequest = event => {
      try {
        const fileLoader = event.data.fileLoader;
        const formData = new FormData();
        const xhr = fileLoader.xhr;
        xhr.withCredentials = true;
        xhr.open("POST", fileLoader.uploadUrl, true);
        formData.append("image", fileLoader.file, fileLoader.fileName);
        fileLoader.xhr.send(formData);
        event.stop();
      } catch (e) {
        console.warn(e);
      }
    };
    this.ckeditorService.fileUploadResponse = event => {
      try {
        event.stop();
        const data = event.data;
        const xhr = data.fileLoader.xhr;
        const response = JSON.parse(xhr.responseText);
        if (response.error) {
          data.message = "upload fail";
          event.cancel();
        } else {
          data.url = "http://127.0.0.1:8000/uploads/" + response.data.save_name;
        }
      } catch (e) {
        console.warn(e);

  }

    }

}
}
