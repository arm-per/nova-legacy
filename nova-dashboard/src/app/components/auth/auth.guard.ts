import { CanActivate, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanLoad{

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       if (this.authService.isAuth()) {
           return true;
       } else {
           this.router.navigate(['/login']);
       }
       //return true;
    }

    canLoad(route: Route) {
        if (this.authService.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
        //return true;
    }
}