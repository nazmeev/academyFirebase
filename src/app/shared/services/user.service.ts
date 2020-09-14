import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { CloudService } from "./cloud.service";
import { loginForm } from "../interfaces/loginform.interface";
import { Observable } from "rxjs";
import { User } from "firebase";

@Injectable({
    providedIn: 'root'
})
export class UserService extends CloudService {

    constructor(protected firestore: AngularFirestore) {
        super(firestore)
    }

    getUserLogin(table: string, user: loginForm):Observable<any> {
        return this.firestore.collection(table, ref =>
            ref.where('email', '==', user.email).
                where('password', '==', user.password)).valueChanges()
    }
}