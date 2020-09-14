import { Injectable } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
import { User } from "../interfaces/user.interface";
import { map, tap } from "rxjs/operators";
// import { Response } from '../interfaces/responce.interface';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string = this.getStorage()
    // static url = 'https://films-boo.firebaseio.com/users'

    constructor(
        // private http: HttpClient,
        private userService: UserService
    ) { }

    login(user: User) {
        console.log('login user', user)
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