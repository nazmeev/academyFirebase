import { AbstractControl } from "@angular/forms";
import { tap } from "rxjs/operators";

export function checkLogin(control: AbstractControl) {
    
    return this.checkLoginRequest(control.value).pipe(
        tap(response => {
            return (response && response[0]['login'] == control.value) ? { 'checkLogin': true } : null
        })
    )
}