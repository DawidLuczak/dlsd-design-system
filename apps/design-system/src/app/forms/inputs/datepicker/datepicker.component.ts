import { Component } from '@angular/core';
import { DLSDDatepickerComponent } from 'libs/dlsd-angular-ui/src/lib';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DLSDDatepickerComponent],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
})
export class DatepickerComponent {}
