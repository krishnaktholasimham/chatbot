import { Component } from '@angular/core';
import { Utils } from '../utils/utils';
import { IMessage } from './message';
import { ChatService} from './chat.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'new-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['exception.css', 'chat.css']
})
export class ExceptionComponent {
  loading: boolean = false;
  public exception : string;
  public value : string;
  closeResult: string;
  responseSaved : boolean = false;

  constructor(private modalService: NgbModal, private chatService : ChatService) {
  }

  saveNewException() {
    let exceptionObj: any = {};
    exceptionObj.exceptionKey = this.exception;
    exceptionObj.exceptionValue = this.value;
    this.loading = true;
    this.chatService.saveNewException(exceptionObj).subscribe((response) => {
      this.exception = '';
      this.value = '';
      this.loading = false;
      this.responseSaved = true;
      setTimeout(() => {
        this.responseSaved = false;
      }, 5000);
    });

  }

}
