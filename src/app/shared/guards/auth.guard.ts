import { Observable } from "rxjs";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const isAuth = this.authService.isAuth()
        console.log('canActivate isAuth', isAuth);
        
        if (!isAuth) {
            const navigationExtras: NavigationExtras = {state: {data: 'Сначала авторизируйтесь или зарегистрируйтесь', type: 'alert-warning'}}
            console.log('AuthGuard navigationExtras', navigationExtras);
            
            this.router.navigate(['user'], navigationExtras)
            return false
        } else {
            return true
        }
    }
}