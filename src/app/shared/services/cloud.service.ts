import { Injectable, OnInit } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CloudService {
    constructor(
        protected firestore: AngularFirestore
    ) {
        console.log('CloudService');

    }

    createData<T>(data: T, table: string): Promise<T> {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection(table)
                .add(data)
                .then(function (docRef) {
                    console.log("Document created with ID: ", docRef.id)
                    resolve({ ...data, id: docRef.id })
                })
                .catch(function (error) {
                    reject(error)
                    console.error("Error adding document: ", error)
                })
        })
    }

    // getUserField(){
    //     this.firestore.collection("cities").where("capital", "==", true)
    // .get()
    // .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // })
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });
    // }

    getDataById(id: string, table: string) {
        return this.firestore.collection(table).doc(id).valueChanges()
    }

    getAllData(table: string) {
        return this.firestore.collection(table).valueChanges()
    }
    // getDataByField(field:string, value:string, table: string) {
    //     return this.firestore.collection(table, ref => ref.where(field, '==', value)).valueChanges()
    // }

    updateData<T>(dataID: string, data: T, table: string) {
        
            return of(this.firestore
                .doc(table + '/' + dataID)
                .update(data))
                
        
    }
    // updateData<T>(dataID: string, data: T, table: string): Promise<T> {
    //     return new Promise<any>((resolve, reject) => {
    //         this.firestore
    //             .doc(table + '/' + dataID)
    //             .update(data)
    //             .then(function (doc) {
    //                 console.log("Document written with ID: ", doc)
    //                 resolve({ doc })
    //             })
    //             .catch(function (error) {
    //                 reject(error)
    //                 console.error("Error adding document: ", error)
    //             })
    //     })
    // }

    deleteData(dataID: string, table: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.firestore.doc(table + '/' + dataID).delete().then(function (docRef) {
                console.log("Document successfully deleted!")
                resolve(dataID)
            })
                .catch(function (error) {
                    reject(error)
                    console.error("Error delete document: ", error)
                })
        })
    }

}