import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [AppComponent],
  template: `<app-component></app-component>`,
})
export class RemoteEntryComponent {}
