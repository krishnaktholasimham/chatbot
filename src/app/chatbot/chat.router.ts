import { Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { ExceptionComponent } from './exception.component';

export const ROUTES: Routes = [
  { path: '', component: ChatComponent },
  { path: 'chat', component: ChatComponent},
  { path: 'exception', component: ExceptionComponent}
];
