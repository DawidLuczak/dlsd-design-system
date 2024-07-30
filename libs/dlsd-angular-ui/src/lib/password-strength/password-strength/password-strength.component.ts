import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Signal,
  computed,
  input,
  runInInjectionContext,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DLSDIconComponent } from '../../icons';
import { I18N_NAMESPACE } from '../../internal/constants';

@Component({
  selector: 'dlsd-password-strength',
  standalone: true,
  imports: [NgTemplateOutlet, NgClass, DLSDIconComponent, TranslateModule],
  templateUrl: './password-strength.component.html',
  styleUrl: './password-strength.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DLSDPasswordStrengthComponent {
  protected readonly I18N = `${I18N_NAMESPACE}.password`;

  public passwordControl = input.required<AbstractControl<string | null>>();

  protected errors!: Signal<ValidationErrors | null>;

  constructor(private injector: Injector) {}

  public ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      const valueChanges = toSignal<string | null>(
        this.passwordControl().valueChanges
      );
      this.errors = computed<ValidationErrors | null>(() => {
        const value = valueChanges();

        const errors = this.passwordControl().errors;
        return errors ? Object.values(errors)[0] : null;
      });
    });
  }
}
