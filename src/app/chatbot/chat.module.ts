import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './chat.router';
import { ChatComponent } from './chat.component';
import {SafeHtmlPipe} from '../utils/safehtml.pipe';

@NgModule({
  declarations: [
    ChatComponent,
    SafeHtmlPipe
  ],
  imports: [
  	CommonModule,
    RouterModule.forChild(ROUTES),
  ],
})
export class ChatModule {
}
