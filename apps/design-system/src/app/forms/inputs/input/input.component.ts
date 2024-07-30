import { Component } from '@angular/core';
import {
  DLSDElementOptionShortcutsDirective,
  DLSDInputComponent,
} from 'libs/dlsd-angular-ui/src/lib';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [DLSDInputComponent, DLSDElementOptionShortcutsDirective],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {}
