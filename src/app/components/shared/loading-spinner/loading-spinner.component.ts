import { Component } from '@angular/core';

@Component({
  selector: 'loading-spinner',
  template: `<div class="lds-ellipsis">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`,
  styleUrl: './loading-spinner.component.css',
})
export class LoadingSpinnerComponent {}
