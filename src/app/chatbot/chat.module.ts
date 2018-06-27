import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './chat.router';
import { ChatComponent } from './chat.component';
import { ExceptionComponent } from './exception.component';
import {SafeHtmlPipe} from '../utils/safehtml.pipe';

@NgModule({
  declarations: [
    ChatComponent,
    ExceptionComponent,
    SafeHtmlPipe
  ],
  imports: [
  	CommonModule,
  	FormsModule,
    RouterModule.forChild(ROUTES),
  ],
})
export class ChatModule {
}
