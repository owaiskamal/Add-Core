import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  // this prevents from getting into another url without login
  canActivate(): boolean {
    if (sessionStorage.getItem('token') != null) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}