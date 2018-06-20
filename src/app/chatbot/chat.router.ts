import { Routes } from '@angular/router';
import { ChatComponent } from './chat.component';

export const ROUTES: Routes = [
  { path: '', component: ChatComponent },
  { path: 'chat', component: ChatComponent},
];
