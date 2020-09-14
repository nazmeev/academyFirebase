import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  public titleMinlength: number = 2
  public titleMaxlength: number = 10
  public overviewMinlength: number = 50
  public overviewMaxlength: number = 400

  public validationMessages = {
    'favTitle': {
      'required': 'Обязательное для заполнения поле\r\n',
      'minlength': `Длина должна быть не меньше ${this.titleMinlength} символов\r\n`,
      'maxlength': `Длина должна быть не больше ${this.titleMaxlength} символов\r\n`,
    },
    
    'favOverview': {
      'required': 'Обязательное для заполнения поле\r\n',
      'minlength': `Длина должна быть не меньше ${this.overviewMinlength} символов\r\n`,
      'maxlength': `Длина должна быть не больше ${this.overviewMaxlength} символов\r\n`
    }
  }
  public formErrors = {
    'favTitle': '',
    'favOverview': ''
  }
  public formErrorsClasses = {
    'favTitle': '',
    'favOverview': ''
  }

  constructor() {}

  get getValidationMessages() {
    return this.validationMessages
  }
  get getFormErrors() {
    return this.formErrors
  }
  get getFormErrorsClasses() {
    return this.formErrorsClasses
  }
}