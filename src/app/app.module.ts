import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { LoaderService } from './utils/loader.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {TransferHttpCacheModule} from '@nguniversal/common';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http'; 
import { ChatService } from './chatbot/chat.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalBasic} from './modal-basic';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NgbdModalBasic
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'},
      { path: 'chat', loadChildren: './chatbot/chat.module#ChatModule'}
    ]),
    TransferHttpCacheModule,
    NgbModule.forRoot()
  ],
  providers: [
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
