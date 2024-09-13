/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DLSDCarouselContainerComponent } from './carousel-container.component';

describe('CarouselContainerComponent', () => {
  let component: DLSDCarouselContainerComponent;
  let fixture: ComponentFixture<DLSDCarouselContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DLSDCarouselContainerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DLSDCarouselContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
