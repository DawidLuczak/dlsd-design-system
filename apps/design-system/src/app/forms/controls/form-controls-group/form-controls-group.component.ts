import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  DLSDFormControlsGroupComponent,
  DLSDInputComponent,
  DLSDSelectComponent,
} from 'libs/dlsd-angular-ui/src/lib';

@Component({
  selector: 'app-form-controls-group',
  standalone: true,
  imports: [
    DLSDFormControlsGroupComponent,
    DLSDInputComponent,
    DLSDSelectComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './form-controls-group.component.html',
  styleUrl: './form-controls-group.component.scss',
})
export class FormControlsGroupComponent {
  protected form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      input: this.fb.control(''),
      select: this.fb.control(''),
    });
  }
}
