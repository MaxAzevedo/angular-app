import { Component } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector : 'app-loading-spinner',
  template : '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
  styleUrls : ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

}
