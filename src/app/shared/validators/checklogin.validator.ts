import { AbstractControl } from "@angular/forms";
import { map, tap } from "rxjs/operators";

export function checkLogin(control: AbstractControl) {
    
    return this.checkLoginRequest(control.value).pipe(
        tap(response => {
            console.log('************************', (response && response[0]['login'] == control.value) ? { 'checkLogin': true } : null);
            // if(!response) return null
            return (response     && response[0]['login'] == control.value) ? { 'checkLogin': true } : null
        })
    )
}