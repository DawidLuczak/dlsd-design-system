import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DLSDPasswordStrengthComponent } from './password-strength.component';

describe('PasswordStrengthComponent', () => {
  let component: DLSDPasswordStrengthComponent;
  let fixture: ComponentFixture<DLSDPasswordStrengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DLSDPasswordStrengthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DLSDPasswordStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
