import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { RegistrationService } from '../../shared/services/registration.service';
import { ComponentCanDeactivate } from '../../shared/interfaces/candeactivate.interface';
import { Observable, Subscription } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { checkLogin } from '../../shared/validators/checklogin.validator';
import { CloudService } from '../../shared/services/cloud.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, ComponentCanDeactivate, OnDestroy {
  registrationForm: FormGroup

  saved: boolean = false
  subsR: Subscription
  subsF: Subscription

  public maxLengthArray: number = 3
  public addPhoneActive: boolean = false

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private cloudService: CloudService
  ) {
    this.registrationService.checkLogin$.subscribe(data => {
      this.onValueChange()
    })
  }

  public formErrorsClasses = this.registrationService.getFormErrorsClasses
  public formErrors = this.registrationService.getFormErrors
  public validationMessages = this.registrationService.getValidationMessages
  public phoneErrors = this.registrationService.phoneErrors
  public phoneErrorsClasses = this.registrationService.phoneErrorsClasses

  ngOnInit(): void {
    this.buildFormRegistration()
    // debugger;
  }
  canDeactivate(): boolean | Observable<boolean> {
    return (!this.saved) ? confirm("Вы хотите покинуть страницу?") : true
  }
  ngOnDestroy() {
    if (this.subsR) this.subsR.unsubscribe()
    if (this.subsF) this.subsF.unsubscribe()
  }

  buildFormRegistration() {
    this.registrationForm = this.fb.group({
      login: ['',
        {
          validators: [
            Validators.required,
            Validators.minLength(this.registrationService.loginMinlength),
            Validators.maxLength(this.registrationService.loginMaxlength),
          ],
          asyncValidators: [checkLogin.bind(this.registrationService)],
        }
      ],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(this.registrationService.passwordMinlength),
        this.registrationService.hasSymbol,
        this.registrationService.hasCapitalSymbol,
        this.registrationService.hasKyrSymbol,
        this.registrationService.hasNumber
      ]],
      phones: new FormArray([])
    }, { updateOn: 'blur' })
    this.subsF = this.registrationForm.valueChanges.subscribe(data => {
      this.onValueChange()
    })
  }

  onValueChange() {
    if (!this.registrationForm) return false
    for (let item in this.formErrors) {

      this.formErrors[item] = ''
      this.formErrorsClasses[item] = ''
      let control = this.registrationForm.get(item)

      let messages = this.validationMessages[item]
      switch (item) {
        case 'phones':
          this.setValidationPhoneInfo(messages)
          break
        default:
          this.setValidationFormInfo(messages, control, item)
          break
      }
    }
  }

  setValidationFormInfo(messages, control, item) {
    if (control && control.dirty && control.touched && control.invalid) {
      for (let key in control.errors) {
        this.formErrors[item] += `${messages[key]}\n\r`
        if (this.formErrors[item] != '') {
          this.formErrorsClasses[item] = 'is-invalid'
        }
      }
    }
    if (control && control.dirty && control.valid) {
      for (let key in control) {
        if (this.formErrors[item] == '') {
          this.formErrorsClasses[item] = 'is-valid'
        }
      }
    }
  }

  setValidationPhoneInfo(messages) {
    this.formPhonesArray.controls.map((phoneRow, i) => {
      this.phoneErrors[i] = ''

      if (!phoneRow.pristine && !phoneRow.valid) {
        for (let key in phoneRow.errors) {
          this.phoneErrors[i] += messages[key]
          this.phoneErrorsClasses[i] = 'is-invalid'
        }
      }
      if (phoneRow.valid) {
        this.phoneErrors[i] = ''
        this.phoneErrorsClasses[i] = 'is-valid'
      }
    })
  }

  get formPhonesArray() {
    return this.registrationForm.get("phones") as FormArray
  }

  addPhone() {
    if (this.formPhonesArray.length < this.maxLengthArray) {
      this.formPhonesArray.push(new FormControl(null, [
        Validators.required,
        this.registrationService.isPhone,
        Validators.minLength(this.registrationService.phoneMinlength),
        Validators.maxLength(this.registrationService.phoneMaxlength)
      ]))
      this.onValueChange()
    }
    this.disableAddPhone()
  }
  removePhone(i: number) {
    this.formPhonesArray.removeAt(i)
    this.enableAddPhone()
  }
  disableAddPhone() {
    if (this.formPhonesArray.length > (this.maxLengthArray - 1)) this.addPhoneActive = true
  }
  enableAddPhone() {
    this.addPhoneActive = false
  }
  resetForm() {
    this.registrationForm.reset()
  }

  registration() {
    let user = this.registrationService.prepareUserToSave(this.registrationForm.value)

    this.cloudService.createData(user, 'users').then(
      resp => {
        this.saved = true
        this.registrationForm.reset()
        this.cloudService.updateData(resp.id, resp, 'users')
        const navigationExtras: NavigationExtras = { state: { data: 'Успешная регистрация', type: 'alert-success' } }
        this.router.navigate(['user'], navigationExtras)
      },
      error => {
        console.warn("Rejected: " + error)
      }
    )
  }

}
