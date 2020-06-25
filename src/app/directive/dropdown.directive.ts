import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive ({
  selector : '[appDropdown]'
})
export class DropdownDirectives {
  @HostBinding('class.open') isOpen : boolean = false;

  @HostListener('click') toogleOpen() {
    this.isOpen = !this.isOpen;
  }
}
