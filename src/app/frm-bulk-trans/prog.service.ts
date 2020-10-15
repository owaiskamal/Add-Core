import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgService {

  data=new BehaviorSubject(0);


  constructor() { }
}
