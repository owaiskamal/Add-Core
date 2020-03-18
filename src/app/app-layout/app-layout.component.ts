import { Component, OnInit } from '@angular/core';
import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  animations : [trigger('routerTransition', [
    transition('* <=> *', [
      /* order */
      /* 1 */ query(':enter, :leave', style({ opacity : 0 ,  position: 'fixed', width:'75%' })
        , { optional: true }),
      /* 2 */ group([  // block executes in parallel
        query(':enter', [
          style({ transform: 'translateX(100%)' , opacity : 0 }),
          animate('0.7s ease-in-out', style({ transform: 'translateX(0%)' , width:'75%', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' , opacity:1 }),
          animate('0.7s ease-in-out', style({ transform: 'translateX(-100%)' , width:'75%', opacity: 0 }))
        ], { optional: true }),
      ])
    ])
  ])
  ]
})

export class AppLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
