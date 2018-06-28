import { Component, ElementRef, ViewChild } from '@angular/core';
import { Utils } from '../utils/utils';
import { IMessage } from './message';
import { ChatService } from './chat.service';

@Component({
  selector: 'chat-bot',
  templateUrl: './chat.component.html',
  styleUrls: ['chat.css', 'bootstrap.min.css']
})
export class ChatComponent {
  @ViewChild('chatwindow') private chatContainer: ElementRef;
  conversation: IMessage[] = [];
  loading: boolean = false;
  constructor(private chatService: ChatService) {

  }
  addMessageFromUser(message) {
    this.conversation.push({
      avatar: 'perm_identity',
      from: 'Me',
      content: message.value
    });

    this.scrollToBottom();
    let input = message.value;
    message.value = '';
    this.loading = true;
    this.chatService.sendMessage(input).subscribe((response) => {
      if (response && response.entities && response.entities.length > 0 && response.entities[0].value) {
        this.chatService.sendDetailException(response.entities[0].value, response.text).subscribe((data) => {
          this.loading = false;
          if (true) {
            this.conversation.push({
              avatar: 'android',
              from: 'Bot',
              content: this.constructData(data) || 'I can\'t seem to figure that out!'
            });
            message.value = '';
            this.scrollToBottom();
          }
        });
      } else if (response && response.intent && response.intent.name) {
        this.chatService.sendDetailException(response.intent.name, null).subscribe((data) => {
          this.loading = false;
          if (true) {
            this.conversation.push({
              avatar: 'android',
              from: 'Bot',
              content: this.constructData(data) || 'I can\'t seem to figure that out!'
            });
            message.value = '';
            this.scrollToBottom();
          }
        });
      } else {
        this.loading = false;
        this.conversation.push({
          avatar: 'android',
          from: 'Bot',
          content: 'Sorry, we couldn\'t find a solution to your problem. We will notify you once we have one'
        });
        message.value = '';
        this.scrollToBottom();
      }

      //this.parseFulfillment(response.data);
    });

    /*client.textRequest(message.value).then((response) => {
      this.conversation.push({
        avatar: 'android',
        from: 'Bot',
        content: this.parseFulfillment(response.result.fulfillment['speech']) || 'I can\'t seem to figure that out!'
      });
      message.value = '';
    });*/
  }

  constructData(data: any) {
    let val = ""
    data.map((item) => val = val + item.exceptionValue);
    return val;
  }

  parseFulfillment(speech: string): string {
    if (Utils.isJson(speech)) {
      var jsonSpeech = JSON.parse(speech);
      switch (jsonSpeech.responseType) {
        case 'question': {
          let resp = jsonSpeech.response.questionText;
          jsonSpeech.response.questionOptions.map((option, index) => resp += '<br>' + (index + 1) + '. ' + option.optionText);
          return resp;
        }
        default: {
          return speech;
        }
      }
    } else {
      return speech;
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}