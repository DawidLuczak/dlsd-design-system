import { Component } from '@angular/core';
import { DLSDSelectComponent } from 'libs/dlsd-angular-ui/src/lib';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [DLSDSelectComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {}
