import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private userService:UserService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): boolean {
    const loggedinUser = this.userService.loggedinUser;
    if(!loggedinUser) this.router.navigateByUrl('')
    return !!loggedinUser;
  }
  
}
