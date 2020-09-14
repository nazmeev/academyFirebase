import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Favorite } from '../../shared/interfaces/favorite.interface';
import { EditService } from '../../shared/services/edit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() item: Favorite | null;
  @Input() title: Favorite | null;
  formEdit: FormGroup

  public formErrors = this.editService.getFormErrors
  public formErrorsClasses = this.editService.getFormErrorsClasses
  public validationMessages = this.editService.getValidationMessages

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private editService: EditService,
  ) {
    this.formEdit = this.fb.group({
      favTitle: ['', [Validators.required, Validators.maxLength(this.editService.titleMaxlength), Validators.minLength(this.editService.titleMinlength)]],
      favOverview: ['', [Validators.required, Validators.maxLength(this.editService.overviewMaxlength), Validators.minLength(this.editService.overviewMinlength)]],
      id: ['', []],
    })

    this.formEdit.valueChanges.subscribe(data => this.onValueChange())
  }

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
    this.activeModal.close(this.formEdit)
  }

  onValueChange() {
    for (let item in this.formErrors) {
      this.formErrorsClasses[item] = ''
      this.formErrors[item] = ''
      let control = this.formEdit.get(item)
      if (!control.pristine) {
        let messages = this.validationMessages[item]

        for (let key in control.errors) {
          this.formErrors[item] += `${messages[key]}`
        }

        (control.valid) ? this.formErrorsClasses[item] = 'is-valid' : this.formErrorsClasses[item] = 'is-invalid'
      }
    }
  }

}
