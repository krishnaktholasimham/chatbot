import {Component} from '@angular/core';
import {NgbdModalBasic} from './modal-basic';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>
  <ngbd-modal-basic></ngbd-modal-basic>
  `,
  styles: []
})
export class AppComponent {

}
