import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  WritableSignal,
  effect,
  input,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DLSDInputComponent } from '../../../forms';
import { DLSDPasswordStrengthComponent } from '../../../password-strength';
import { AccountForm } from '../interfaces';
import { AccountFormMode } from './../constants';

@Component({
  selector: 'dlsd-login',
  standalone: true,
  imports: [
    DLSDInputComponent,
    DLSDPasswordStrengthComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DLSDLoginComponent {
  protected readonly AccountFormMode = AccountFormMode;

  @HostBinding('style.grid-template')
  @Input()
  public layout = '"email" "password"';
  public hasPasswordStrength = input<boolean>(true);
  public formMode = input<AccountFormMode>(AccountFormMode.SIGN_IN);
  public form: WritableSignal<FormGroup>;

  constructor(private fb: FormBuilder) {
    this.form = signal(AccountForm.Login.Form(this.fb));
    effect(
      () => {
        const mode = this.formMode();

        if (mode === AccountFormMode.SIGN_IN) {
          this.form.set(AccountForm.Login.Form(this.fb));
        } else {
          // this.form().addControl(
          //   '',
          //   AccountForm.Controls.Password.Control(this.fb)
          // );
        }
      },
      {
        allowSignalWrites: true,
      }
    );
  }
}
