import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() feature = new EventEmitter<string>();

  onSelection(feature : string) {
    this.feature.emit(feature);
  }

}
