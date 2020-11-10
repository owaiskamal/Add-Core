import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NavlinksService } from '../menu-page/navlinks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor( private navlinkservice: NavlinksService) {
    
    
   }
  sideMenu: boolean;
  columns: any[] = [];
  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

  ngOnInit(): void {
    this.navlinkservice.currentData.subscribe(data => {
      console.log(data,"Dashboard compoennt");
      this.sideMenu = data
    });
    this.columns = [
      {
        name: 'Create Transaction',
        icon: 'fas fa-credit-card',
        route:'/menu/frmCreateTrans/8002',
        imgRoute:"../../assets/images/galleria1.jpg"
      },
      {
        name: 'Bulk Transaction',
        icon: 'fas fa-file-excel',
        route:'/frmCreate',
        imgRoute:"../../assets/images/galleria10.jpg"
      },
      {
        name: 'Repair Transaction',
        icon: 'fas fa-wrench',
        route:'/frmCreate',
        imgRoute:"../../assets/images/galleria11.jpg"
      },
    ];
  }

}
