import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DLSDRadioButtonComponent } from 'libs/dlsd-angular-ui/src/lib';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [DLSDRadioButtonComponent, ReactiveFormsModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
})
export class RadioButtonComponent {
  protected form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      radio: this.fb.control('1'),
    });
  }
}
