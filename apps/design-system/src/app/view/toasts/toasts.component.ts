import { Component } from '@angular/core';
import {
  DLSDButtonComponent,
  DLSDToastService,
  DLSDToastType,
} from 'libs/dlsd-angular-ui/src/lib';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [DLSDButtonComponent],
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.scss',
})
export class ToastsComponent {
  constructor(private toastService: DLSDToastService) {}

  protected showToast(): void {
    const toastType =
      Object.values(DLSDToastType)[
        Math.round(Math.random() * 100) % Object.keys(DLSDToastType).length
      ];
    this.toastService.showCustom(toastType);
  }
}
