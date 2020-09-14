import { Observable } from "rxjs";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class GuestGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const isAuth = this.authService.isAuth()
        console.log('GuestGuard canActivate isAuth', isAuth);
        
        if (isAuth) {
            const navigationExtras: NavigationExtras = {state: {data: 'Уже авторизированы', type: 'alert-warning'}}
            console.log('GuestGuard navigationExtras', navigationExtras);
            this.router.navigate(['user'], navigationExtras)
            return false
        } else {
            return true
        }
    }
}