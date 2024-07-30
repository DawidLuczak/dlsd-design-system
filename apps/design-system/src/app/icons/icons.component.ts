import { Component } from '@angular/core';
import { DLSDIconComponent, ICONS } from 'libs/dlsd-angular-ui/src/lib';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [DLSDIconComponent],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss',
})
export class IconsComponent {
  protected readonly Object = Object;
  protected readonly ICONS = ICONS;
}
