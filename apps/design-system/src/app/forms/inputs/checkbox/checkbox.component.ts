import { Component } from '@angular/core';
import { DLSDCheckboxComponent } from 'libs/dlsd-angular-ui/src/lib';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [DLSDCheckboxComponent],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {}
