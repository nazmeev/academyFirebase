import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class CloudService {
    constructor(
        protected firestore: AngularFirestore
    ) { }

    createData<T>(data: T, table: string): Promise<T> {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection(table)
                .add(data)
                .then(function (docRef) {
                    resolve({ ...data, id: docRef.id })
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    getDataById(id: string, table: string) {
        return this.firestore.collection(table).doc(id).valueChanges()
    }

    getAllData(table: string) {
        return this.firestore.collection(table).valueChanges()
    }

    updateData<T>(dataID: string, data: T, table: string): Promise<T> {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .doc(table + '/' + dataID)
                .update(data)
                .then(function (doc) {
                    resolve({ doc })
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    deleteData(dataID: string, table: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.firestore.doc(table + '/' + dataID).delete().then(function (docRef) {
                resolve(dataID)
            })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

}