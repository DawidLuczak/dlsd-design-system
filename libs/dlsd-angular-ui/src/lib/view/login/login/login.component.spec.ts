import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DLSDLoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: DLSDLoginComponent;
  let fixture: ComponentFixture<DLSDLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DLSDLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DLSDLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
