import { Injectable } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { User } from '../interfaces/user.interface';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { map, tap } from 'rxjs/operators';
// import { Favorite } from '../interfaces/favorite.interface';
import { CloudService } from '../../shared/services/cloud.service';
import { map, tap, find } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  public loginMinlength: number = 5
  public loginMaxlength: number = 8
  public passwordMinlength: number = 4
  public phoneMinlength: number = 10
  public phoneMaxlength: number = 13

  private checkLoginSource = new Subject()
  public checkLogin$ = this.checkLoginSource.asObservable()

  // static url = 'https://films-boo.firebaseio.com/users'

  public validationMessages = {
    'login': {
      'required': 'Обязательное для заполнения поле\r\n',
      'minlength': `Длина должна быть не меньше ${this.loginMinlength} символов\r\n`,
      'maxlength': `Длина должна быть не больше ${this.loginMaxlength} символов\r\n`,
      'checkLogin': `Не уникальный логин`,
    },
    'email': {
      'required': 'Обязательное для заполнения поле\r\n',
      'email': 'Не удовлетворяет формат ел. почты\r\n',
    },
    'password': {
      'required': 'Обязательное для заполнения поле\r\n',
      'minlength': `Длина должна быть не меньше ${this.passwordMinlength} символов\r\n`,
      'hasSymbol': `Должны быть символы`,
      'hasCapitalSymbol': `Должны быть заглавные символы`,
      'hasKyrSymbol': `Не должно быть кириличных символов`,
      'hasNumber': `Должны быть цифры\r\n`,
    },
    'phones': {
      'required': 'Обязательное для заполнения поле\r\n',
      'isPhone': 'Неверный формат телефонного номера\r\n',
      'minlength': `Длина должна быть не меньше ${this.phoneMinlength} символов\r\n`,
      'maxlength': `Длина должна быть не больше ${this.phoneMaxlength} символов\r\n`,
    }
  }
  public formErrors = {
    'login': '',
    'email': '',
    'password': '',
    'phones': ''
  }
  public formErrorsClasses = {
    'login': '',
    'email': '',
    'password': '',
    'phones': ''
  }
  public phoneErrors = {}
  public phoneErrorsClasses = {}

  constructor(
    private http: HttpClient,
    private cloudService: CloudService) {
     }

  get getValidationMessages() {
    return this.validationMessages
  }
  get getFormErrors() {
    return this.formErrors
  }
  get getFormErrorsClasses() {
    return this.formErrorsClasses
  }

  hasNumber(control: FormControl) {
    return (!/[0-9]/.test(control.value)) ? { "hasNumber": true } : null
  }
  hasSymbol(control: FormControl) {
    return (!/[a-z]/.test(control.value)) ? { "hasSymbol": true } : null
  }
  hasKyrSymbol(control: FormControl) {
    return (/[а-я, А-Я]/i.test(control.value)) ? { "hasKyrSymbol": true } : null
  }
  hasCapitalSymbol(control: FormControl) {
    return (!/[A-Z]/.test(control.value)) ? { "hasCapitalSymbol": true } : null
  }
  isPhone(control: FormControl) {
    return (!/^[-+]?[0-9]+$/.test(control.value)) ? { "isPhone": true } : null
  }

  prepareUserToSave(user: User): User {
    user.phones = user.phones.toString()
    return user
  }

  // checkLogin(control: AbstractControl) {
  //   console.log('checkLoginValidator value', control.value);
  //   //  return of(null)
  //   // return this.checkLoginRequest(control.value).pipe(
  //     return this.http.get(`${RegistrationService.url}.json`).pipe(
  //     tap(resp => {
  //         let result = Object.keys(resp).map(key => ({ ...resp[key], id: key }))
  //         let match = result.filter(key => (key.login == control.value));
  //         let validationResult =  (match.length) ? { 'checkLogin': true } : null
  //         console.log('match', validationResult)
  //         this.checkLoginSource.next(validationResult)
  //         return validationResult
  //     })
  //   )
  // }
  // checkLogin(control: AbstractControl) {
  //   console.log('111111111111111')
  //   return this.checkLoginRequest(control.value).pipe(
  //     map(response => {
  //       console.log('000000000000000000')
  //       // console.log('************************', response[0]['login']);
  //       // console.log('************************', (response && response[0]['login'] == control.value) ? { 'checkLogin': true } : null);
  //       // if(!response) return null
  //       // if(response[0]['login'] == control.value) return { 'checkLogin': true } : null
  //   })
  //   )

  // }
  checkLoginRequest(login: string): Observable<any[]> {
    return this.cloudService.getAllData('users').pipe(
      map(resp => {
        this.checkLoginSource.next('sssss')
        return resp.filter(item => item['login'] == login)
      })
    )
  }
}
