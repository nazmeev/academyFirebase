import { Observable } from "rxjs";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

export class RegistrationGuard implements CanActivate{
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
        return confirm('Вы уверены, что хотите перейти?');
    }
}