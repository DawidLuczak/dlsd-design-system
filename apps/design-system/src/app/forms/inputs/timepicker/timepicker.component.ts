import { Component } from '@angular/core';
import { DLSDTimepickerComponent } from 'libs/dlsd-angular-ui/src/lib';

@Component({
  selector: 'app-timepicker',
  standalone: true,
  imports: [DLSDTimepickerComponent],
  templateUrl: './timepicker.component.html',
  styleUrl: './timepicker.component.scss',
})
export class TimepickerComponent {}
