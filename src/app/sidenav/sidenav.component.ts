import { Component, OnInit, Input, HostBinding, Output ,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { NavService } from '../nav.service';



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('500ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
    trigger('dropdown',[
      state('collapsed', style({
        opacity: 0
      })),
      state('expanded', style({
        opacity: 1
      })),
      transition('collapsed => expanded', animate('400ms ease-in-out')),
      transition('expanded => collapsed', animate('400ms ease-in-out'))

    ])
  ]
})
export class SidenavComponent implements OnInit {
  @Input() item;
  @Input() depth: number;
  @Output() messageEvent = new EventEmitter();
  expanded = false;
  visibleSidebar1 = true;
  messa = "ASdasdasdasdasdasdasd1q231231"
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  constructor(public route : Router , public navService: NavService) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit(): void {
    this.ariaExpanded = this.expanded;

  }

  onItemClick(item)
  {
    //console.log(item);

    if (!item.Forms || !item.Forms.length) {

      this.route.navigate(['adminpage/'+item.RLink+'/' +item.id]);
      if(this.route.isActive('adminpage/'+item.RLink+'/' +item.id , true))
      {
      console.log('is active' );
      }
      else {
        console.log('not active');

      }
      this.navService.closeNav(true);

    }
    if (item.Forms && item.Forms.length) {
      this.expanded = !this.expanded;
      this.messageEvent.emit("dropdown");
    }
  }


}
