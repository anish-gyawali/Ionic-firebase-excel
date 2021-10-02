import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import {take, map, tap} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor
  (
    private auth :AuthService,
    private router:Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$
    .pipe(
      take(1),
      map(user=>user?true:false),
      tap(isLoggedIn=>{
        if(!isLoggedIn){
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
  
}
