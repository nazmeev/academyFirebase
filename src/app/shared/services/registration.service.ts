import { Injectable } from '@angular/core';
import { FormControl} from '@angular/forms';
import { User } from '../interfaces/user.interface';
import { Observable, Subject } from 'rxjs';
import { CloudService } from '../../shared/services/cloud.service';
import { map } from 'rxjs/operators';

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

  public validationMessages = {
    'login': {
      'required': 'Обязательное для заполнения поле',
      'minlength': `Длина должна быть не меньше ${this.loginMinlength} символов`,
      'maxlength': `Длина должна быть не больше ${this.loginMaxlength} символов`,
      'checkLogin': `Не уникальный логин`,
    },
    'email': {
      'required': 'Обязательное для заполнения поле',
      'email': 'Не удовлетворяет формат ел. почты',
    },
    'password': {
      'required': 'Обязательное для заполнения поле',
      'minlength': `Длина должна быть не меньше ${this.passwordMinlength} символов`,
      'hasSymbol': `Должны быть символы`,
      'hasCapitalSymbol': `Должны быть заглавные символы`,
      'hasKyrSymbol': `Не должно быть кириличных символов`,
      'hasNumber': `Должны быть цифры`,
    },
    'phones': {
      'required': 'Обязательное для заполнения поле',
      'isPhone': 'Неверный формат телефонного номера',
      'minlength': `Длина должна быть не меньше ${this.phoneMinlength} символов`,
      'maxlength': `Длина должна быть не больше ${this.phoneMaxlength} символов`,
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

  checkLoginRequest(login: string): Observable<any[]> {
    return this.cloudService.getAllData('users').pipe(
      map(resp => {
        this.checkLoginSource.next('')
        return resp.filter(item => item['login'] == login)
      })
    )
  }
}
