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