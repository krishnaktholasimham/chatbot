import { Component } from '@angular/core';
import { Utils } from '../utils/utils';
import { IMessage } from './message';
import { ChatService} from './chat.service';

@Component({
  selector: 'new-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['exception.css']
})
export class ExceptionComponent {

  public exception : string;
  public value : string;

  constructor(private chatService : ChatService) {
  }

  saveNewException() {
    let exceptionObj : any = {};
    exceptionObj.exception = this.exception;
    exceptionObj.value = this.value;
    this.chatService.saveNewException(exceptionObj).subscribe((response) => {
      
    });

  }

}