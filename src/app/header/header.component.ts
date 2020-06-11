import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html'
})
export class HeaderComponent{

  @Output() featuresSelectEvent = new EventEmitter<string>();

  onSelect(feature : string) {
    this.featuresSelectEvent.emit(feature);
  }
}
