import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  DIGITS_REGEXP,
  LOWERCASE_LETERS_REGEXP,
  SPECIAL_CHARACTERS_REGEXP,
  UPPERCASE_LETERS_REGEXP,
} from '../../utilities/regex-patterns';

export interface AccountId {
  id: string;
}

export interface AccountCredentials<T = string> {
  email: T;
  password: T;
}

export interface Account extends AccountId, Partial<AccountCredentials> {}

export type AccountCredentialsForm = FormGroup<AccountCredentials<FormControl>>;

export type AccountLoginFormData = AccountCredentialsForm;

export type AccountRegisterFormData = AccountLoginFormData &
  FormGroup<{
    passwordRepeat: FormControl;
  }>;

class AccountEmailControl {
  public static Control = (fb: FormBuilder): FormControl<string | null> =>
    fb.control<string | null>('', [Validators.required, Validators.email]);
}

class AccountPasswordValidation {
  private static PasswordUppercaseLetters = (value: string) =>
    !UPPERCASE_LETERS_REGEXP.test(value);
  private static PasswordLowercaseLetters = (value: string) =>
    !LOWERCASE_LETERS_REGEXP.test(value);
  private static PasswordDigit = (value: string) => !DIGITS_REGEXP.test(value);
  private static PasswordSpecialCharacters = (value: string) =>
    !SPECIAL_CHARACTERS_REGEXP.test(value);
  private static PasswordMinLength = (value: string) => value.length < 6;

  private static AccountPasswordValidationCriteria = (value: string) => ({
    uppercaseLetters: this.PasswordUppercaseLetters(value),
    lowercaseLetters: this.PasswordLowercaseLetters(value),
    digits: this.PasswordDigit(value),
    specialCharacters: this.PasswordSpecialCharacters(value),
    minLength: this.PasswordMinLength(value),
  });

  public static AccountPasswordStrengthValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const errors = Object.fromEntries(
      Object.entries(
        AccountPasswordValidation.AccountPasswordValidationCriteria(
          control.value
        )
      ).filter((value) => !!value)
    );

    return Object.entries(errors).filter((error) => error[1]).length
      ? { password: errors }
      : null;
  };

  public static AccountPasswordValidator =
    (
      passwordControlName: string = 'password',
      passwordRepeatControlName: string = 'passwordRepeat'
    ) =>
    (formGroup: FormGroup): void => {
      const passwordControl = formGroup.get(passwordControlName);

      if (passwordControl?.invalid) return;

      const repeatPasswordControl = formGroup.get(passwordRepeatControlName);
      if (passwordControl!.value === repeatPasswordControl?.value) return;

      passwordControl?.setErrors({ invalid: 'error' });
    };
}

class AccountPasswordControl {
  public static Validation = AccountPasswordValidation;

  public static Control = (fb: FormBuilder, validators: Validators[] = []) =>
    fb.control<string>('', [
      Validators.required,
      Validators.minLength(6),
      ...validators,
    ] as Validators);
}

class AccountFormControls {
  public static Email = AccountEmailControl;
  public static Password = AccountPasswordControl;
}

class AccountLoginForm {
  public static Form = (fb: FormBuilder) =>
    fb.group({
      email: AccountFormControls.Email.Control(fb),
      password: AccountFormControls.Password.Control(fb),
    });
}

class AccountRegisterForm {
  public static Form = (fb: FormBuilder) =>
    fb.group({
      email: AccountFormControls.Email.Control(fb),
      password: AccountFormControls.Password.Control(fb, [
        AccountFormControls.Password.Validation
          .AccountPasswordStrengthValidator,
      ]),
      passwordRepeat: AccountFormControls.Password.Control(fb, []),
      validators: [
        AccountFormControls.Password.Validation.AccountPasswordValidator(),
      ],
    });
}

export class AccountForm {
  public static Controls = AccountFormControls;
  public static Login = AccountLoginForm;
  public static Register = AccountRegisterForm;
}
