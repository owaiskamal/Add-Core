import { Component, OnInit } from "@angular/core";
import { TableDataService } from "./table-data.service";
import { FilterUtils } from "primeng/utils";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { __values } from 'tslib';

@Component({
  selector: "app-frmlist",
  templateUrl: "./frmlist.component.html",
  styleUrls: ["./frmlist.component.scss"],
})
export class FrmlistComponent implements OnInit {
  constructor(
    private tableDataService: TableDataService,
    private _route: ActivatedRoute,
    private messageService : MessageService,
    private title: Title
  ) {
    //this.formID = this._route.snapshot.paramMap.get('id');
  }
  userLists: Object = [];
  tableHeader: String;
  totalrecords: number;
  userList: any[] = [];
  formID: any;

  cols: any[] = [];
  ngOnInit(): void {
    this.cols = [];
    this._route.params.subscribe((params) => {
      this.formID = params["id"];
      console.log(this._route['data']['_value'],"URL id has changed");
      this.getuserdata();
      
    });
     var title1 =this._route.snapshot.paramMap.get('title')
     this.title.setTitle("CR-PL - " +title1);
    FilterUtils["custom"] = (value, filter): boolean => {
      if (filter === undefined || filter === null || filter.trim() === "") {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return parseInt(filter) > value;
    };
  }
  getuserdata() {
    this.tableDataService.getTableData(this.formID).subscribe((res) => {
      this.tableHeader = res.description;
      console.log("SetupView", res);

      this.userLists = JSON.parse(res.detailData.detail);
      console.log(this.userLists);
      this.userList = Object.values(this.userLists);
      this.totalrecords = this.userList.length;
      // this.cols = Object.keys(this.userLists[0]);
      this.cols = [];
      for (var i = 0; i < Object.keys(this.userLists[0]).length; i++) {
        this.cols[i] = {
          header: Object.keys(this.userLists[0])[i],
          field: Object.keys(this.userLists[0])[i],
        };
        console.log(this.cols,"colss");
        
      }
      console.log(this.totalrecords, "asdasd");

      //this.userarray.push(this.userList);
    },
    (error) =>
    { this.messageService.add({
      severity: "warn",
      summary: "Connection Failed",
      detail: "Connection Timed Out"
    });
    });

    //console.log(this.userarray);
  }
}
