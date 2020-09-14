import {CanDeactivate} from "@angular/router";
import {Observable} from "rxjs";
import { ComponentCanDeactivate } from "../interfaces/candeactivate.interface";
 
export class ExitRegistrationGuard implements CanDeactivate<ComponentCanDeactivate>{
    canDeactivate(component: ComponentCanDeactivate) : Observable<boolean> | boolean{
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}