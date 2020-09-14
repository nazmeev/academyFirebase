import { collectExternalReferences } from '@angular/compiler';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CloudService } from 'src/app/shared/services/cloud.service';
import { Favorite } from '../../shared/interfaces/favorite.interface';
import { EditService } from '../../shared/services/edit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() item: Favorite | null;
  formEdit: FormGroup

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private editService: EditService,
    private cloudService: CloudService,
  ) {
    this.formEdit = this.fb.group({
      favTitle: ['', [Validators.required, Validators.maxLength(this.editService.titleMaxlength), Validators.minLength(this.editService.titleMinlength)]],
      favOverview: ['', [Validators.required, Validators.maxLength(this.editService.overviewMaxlength), Validators.minLength(this.editService.overviewMinlength)]],
      id: ['', []],

    })

    this.formEdit.valueChanges.subscribe(data => this.onValueChange())
  }

  public formErrors = this.editService.getFormErrors
  public formErrorsClasses = this.editService.getFormErrorsClasses
  public validationMessages = this.editService.getValidationMessages

  ngOnInit(): void {
    if (this.item) this.setValue()
    this.onValueChange()
  }

  setValue() {
    this.formEdit.setValue({
      favTitle: this.item.favTitle,
      favOverview: this.item.favOverview,
      id: this.item.id
    })
  }

  save() {
    this.cloudService.updateData(this.formEdit.value.id, this.formEdit.value, 'favorites').then(
      res => this.activeModal.close(true)
    )
  }

  onValueChange() {
    for (let item in this.formErrors) {

      this.formErrors[item] = ''
      this.formErrorsClasses[item] = ''
      let control = this.formEdit.get(item)
      let messages = this.validationMessages[item]

      for (let key in control.errors) {
        this.formErrors[item] += `${messages[key]}`
      }

      (control.valid) ? this.formErrorsClasses[item] = 'is-valid' : this.formErrorsClasses[item] = 'is-invalid'
    }
  }

}
