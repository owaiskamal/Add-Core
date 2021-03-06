/* import { Component, OnInit } from "@angular/core";
import { TableDataService } from "./table-data.service";
import { FilterUtils } from "primeng/utils";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: "app-search-table",
  templateUrl: "./search-table.component.html",
  styleUrls: ["./search-table.component.scss"]
})
export class SearchTableComponent implements OnInit {
  constructor(private tableDataService: TableDataService,private _route: ActivatedRoute) {
    this.formID = this._route.snapshot.paramMap.get('id');
  }
  
  userLists: Object = [];
  totalrecords: number;
  userList: any[] = [];
  formID: any;
  cols: any[] = [];
  ngOnInit(): void {
    this.getuserdata();

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
    this.tableDataService.getTableData(this.formID).subscribe(res => {

    console.log("SetupView",JSON.parse(res.detailData.detail));
   
     this.userLists = JSON.parse(res.detailData.detail);
      console.log(this.userLists);
      this.userList = Object.values(this.userLists);
      this.totalrecords = this.userList.length;
      this.cols = Object.keys(this.userLists[0]);
      for (var i = 0; i < Object.keys(this.userLists[0]).length; i++) {
        this.cols[i] = {
          header: Object.keys(this.userLists[0])[i],
          field: Object.keys(this.userLists[0])[i]
        };
      }
      console.log(this.totalrecords, "asdasd");  

      this.userarray.push(this.userList);
    });

    console.log(this.userarray);
  }
 
} */
