import { FormControl } from '@angular/forms';
import { dlsdPasswordStrengthValidator } from './password-strength-validator';

describe('passwordStrengthValidator', () => {
  let passwordControl: FormControl;

  beforeEach(() => {
    passwordControl = new FormControl('', [dlsdPasswordStrengthValidator]);
    passwordControl.markAsTouched();
    passwordControl.markAsDirty();
  });

  it('should have no errors', () => {
    passwordControl.setValue('Ab1@3456');

    const passwordStrengthErrors = passwordControl.getError('passwordStrength');

    expect(passwordStrengthErrors).toBeNull();
  });

  it('should have all errors', () => {
    passwordControl.setValue('');

    const passwordStrengthErrors = passwordControl.getError('passwordStrength');

    expect(passwordStrengthErrors.uppercaseLetters).toBeTrue();
    expect(passwordStrengthErrors.lowercaseLetters).toBeTrue();
    expect(passwordStrengthErrors.digits).toBeTrue();
    expect(passwordStrengthErrors.specialCharacters).toBeTrue();
    expect(passwordStrengthErrors.minLength).toBeTrue();
  });

  it('should have only uppercase letter error', () => {
    passwordControl.setValue('ab1@3456');

    const passwordStrengthErrors = passwordControl.getError('passwordStrength');

    expect(passwordStrengthErrors.uppercaseLetters).toBeTrue();
    expect(passwordStrengthErrors.lowercaseLetters).toBeFalse();
    expect(passwordStrengthErrors.digits).toBeFalse();
    expect(passwordStrengthErrors.specialCharacters).toBeFalse();
    expect(passwordStrengthErrors.minLength).toBeFalse();
  });

  it('should have only lowercase letter error', () => {
    passwordControl.setValue('AB1@3456');

    const passwordStrengthErrors = passwordControl.getError('passwordStrength');

    expect(passwordStrengthErrors.uppercaseLetters).toBeFalse();
    expect(passwordStrengthErrors.lowercaseLetters).toBeTrue();
    expect(passwordStrengthErrors.digits).toBeFalse();
    expect(passwordStrengthErrors.specialCharacters).toBeFalse();
    expect(passwordStrengthErrors.minLength).toBeFalse();
  });

  it('should have only digits error', () => {
    passwordControl.setValue('Abcdefg!');

    const passwordStrengthErrors = passwordControl.getError('passwordStrength');

    expect(passwordStrengthErrors.uppercaseLetters).toBeFalse();
    expect(passwordStrengthErrors.lowercaseLetters).toBeFalse();
    expect(passwordStrengthErrors.digits).toBeTrue();
    expect(passwordStrengthErrors.specialCharacters).toBeFalse();
    expect(passwordStrengthErrors.minLength).toBeFalse();
  });

  it('should have only special characters error', () => {
    passwordControl.setValue('Ab123456');

    const passwordStrengthErrors = passwordControl.getError('passwordStrength');

    expect(passwordStrengthErrors.uppercaseLetters).toBeFalse();
    expect(passwordStrengthErrors.lowercaseLetters).toBeFalse();
    expect(passwordStrengthErrors.digits).toBeFalse();
    expect(passwordStrengthErrors.specialCharacters).toBeTrue();
    expect(passwordStrengthErrors.minLength).toBeFalse();
  });

  it('should have only length error', () => {
    passwordControl.setValue('Ab1@');

    const passwordStrengthErrors = passwordControl.getError('passwordStrength');

    expect(passwordStrengthErrors.uppercaseLetters).toBeFalse();
    expect(passwordStrengthErrors.lowercaseLetters).toBeFalse();
    expect(passwordStrengthErrors.digits).toBeFalse();
    expect(passwordStrengthErrors.specialCharacters).toBeFalse();
    expect(passwordStrengthErrors.minLength).toBeTrue();
  });
});
