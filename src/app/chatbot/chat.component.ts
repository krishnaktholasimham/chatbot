import { Component } from '@angular/core';
import { Utils } from '../utils/utils';
import { IMessage } from './message';
import { ChatService} from './chat.service';

@Component({
  selector: 'chat-bot',
  templateUrl: './chat.component.html',
  styleUrls: ['chat.css']
})
export class ChatComponent {

  conversation: IMessage[] = [];
  constructor(private chatService : ChatService) {

  }
    addMessageFromUser(message) {
      this.conversation.push({
        avatar: 'perm_identity',
        from: 'Me',
        content: message.value
      });

      this.chatService.sendMessage(message.value).subscribe((response) => {
        if(response && response.entities && response.entities.length > 0 && response.entities[0].value) {
          this.chatService.sendDetailException(response.entities[0].value).subscribe((data) => {
            if(true){
            this.conversation.push({
              avatar: 'android',
              from: 'Bot',
              content: this.constructData(data) || 'I can\'t seem to figure that out!'
            });
            message.value = '';
          }
          });
        }else if(response && response.intent && response.intent.name) {
          this.chatService.sendDetailException(response.intent.name).subscribe((data) => {
            if(true){
            this.conversation.push({
              avatar: 'android',
              from: 'Bot',
              content: this.constructData(data) || 'I can\'t seem to figure that out!'
            });
            message.value = '';
          }
          });
        } else {
          this.conversation.push({
              avatar: 'android',
              from: 'Bot',
              content: 'Sorry, we couldn\'t find a solution to your problem. We will notify you once we have one'
            });
          message.value = '';
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

    constructData(data : any) {
      let val = ""
      data.map((item) => val = val + item.exceptionValue);
      return val;
    }

    parseFulfillment(speech : string) : string {
      if(Utils.isJson(speech)) {
        var jsonSpeech = JSON.parse(speech);
        switch(jsonSpeech.responseType) {
          case 'question': {
            let resp =  jsonSpeech.response.questionText;
            jsonSpeech.response.questionOptions.map((option, index) => resp += '<br>' + (index + 1) + '. ' + option.optionText);
            return resp;
          }
          default : {
            return speech;
          }
        }
      } else {
        return speech;
      }
    }

}