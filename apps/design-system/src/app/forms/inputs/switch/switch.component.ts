import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DLSDSwitchComponent } from 'libs/dlsd-angular-ui/src/lib';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [DLSDSwitchComponent, ReactiveFormsModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class SwitchComponent {
  protected form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      disabled: this.fb.control({ value: false, disabled: true }),
    });
  }
}
