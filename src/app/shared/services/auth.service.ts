import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { tap } from "rxjs/operators";
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string = this.getStorage()

    constructor(
        private userService: UserService
    ) { }

    login(user: User) {
        return this.userService.getUserLogin('users', user).pipe(
            tap(resp => {
                (user.email == resp[0]['email'] && user.password == resp[0]['password']) ?
                    this.setStorage(resp[0]['id']) :
                    this.logOut()
            })
        )
        
    }

    setToken(token: string) {
        this.token = token
    }
    getToken(): string {
        return this.token
    }
    isAuth(): boolean {
        return !!this.token
    }
    logOut() {
        this.setToken(null)
        sessionStorage.clear()
    }
    setStorage(token: string) {
        sessionStorage.setItem('auth-token', token)
        this.setToken(token)
    }
    getStorage() {
        return sessionStorage.getItem('auth-token')
    }
}