import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DLSDTabsComponent, DLSDTabsType } from 'libs/dlsd-angular-ui/src/lib';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [DLSDTabsComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  protected readonly TabsType = DLSDTabsType;
}
