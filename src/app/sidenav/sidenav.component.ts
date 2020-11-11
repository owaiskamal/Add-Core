import { Component, OnInit, Input, HostBinding, Output ,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, transition, animate, style, group } from '@angular/animations';
import { NavService } from '../nav.service';
import { Title } from '@angular/platform-browser';



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
      state('in', style({
          'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
      })),
      state('out', style({
          'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
      })),
      transition('in => out', [group([
          animate('200ms ease-in-out', style({
              'opacity': '0'
          })),
          animate('400ms ease-in-out', style({
              'max-height': '0px'
          })),
          animate('500ms ease-in-out', style({
              'visibility': 'hidden'
          }))
      ]
      )]),
      transition('out => in', [group([
          animate('1ms ease-in-out', style({
              'visibility': 'visible'
          })),
          animate('600ms ease-in-out', style({
              'max-height': '500px'
          })),
          animate('800ms ease-in-out', style({
              'opacity': '1'
          }))
      ]
      )])
  ]
  )
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
  animationState = 'out';
  constructor(public route : Router , public navService: NavService , private title : Title) {
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

      this.route.navigate(['menu/'+item.RLink+'/' +item.id , {title : item.Name}] );
      console.log(item , "new daa");

    this.title.setTitle( 'CR-PL - '+item.Name);
      if(this.route.isActive('menu/'+item.RLink+'/' +item.id , true))

      {
      console.log('is active' );
      this.title.setTitle( 'CR-PL - '+item.Name);

      }
      else {
        console.log('not active');

      }
      this.navService.closeNav(true);

    }
    if (item.Forms && item.Forms.length) {
      this.expanded =! this.expanded
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      this.messageEvent.emit("dropdown");
    }
  }


}
