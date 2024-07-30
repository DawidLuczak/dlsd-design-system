import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

const UPPERCASE_LETERS_REGEXP = /[A-Z]/;
const LOWERCASE_LETERS_REGEXP = /[a-z]/;
const DIGITS_REGEXP = /[0-9]/;
const SPECIAL_CHARACTERS_REGEXP = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

export const dlsdPasswordStrengthValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value ?? '';
  const errors = Object.fromEntries(
    Object.entries({
      uppercaseLetters: !UPPERCASE_LETERS_REGEXP.test(value),
      lowercaseLetters: !LOWERCASE_LETERS_REGEXP.test(value),
      digits: !DIGITS_REGEXP.test(value),
      specialCharacters: !SPECIAL_CHARACTERS_REGEXP.test(value),
      minLength: value.length < 6,
    }).filter((value) => !!value)
  );

  return Object.entries(errors).filter((error) => error[1]).length
    ? { password: errors }
    : null;
};

export const dlsdPasswordValidator =
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
