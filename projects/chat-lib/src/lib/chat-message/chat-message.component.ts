import { Component, OnInit, Input } from '@angular/core';
import { ChatLibService } from '../chat-lib.service';
import { takeUntil } from 'rxjs/operators';
import { Subject} from 'rxjs';
import { WebsocketioService } from '../websocketio.service';

@Component({
  selector: 'lib-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
}) 
export class ChatMessageComponent implements OnInit {
  @Input() data;
  public buttons = [];
  public isButtonAvailable:boolean = false;
  public unsubscribe$ = new Subject<void>();
  constructor(public chatService: ChatLibService, public wss: WebsocketioService) { 
  }

  ngOnInit() {
    if(this.data.buttons) {
      this.isButtonAvailable = true;
      this.buttons = this.data.buttons
    }
    this.buttons = this.data.buttons?this.data.buttons:''
  }

  buttonClicked(indx, text){
    this.disableButtons()
    this.chatService.chatListPush('sent',text);
    const req = {
      data: {
        body: indx
        }
      }
    this.sendMessage(req)
  }

  disableButtons(){
    this.chatService.disableButtons()
  }

  sendMessage(req) {

    const reqData = this.chatService.chatpost(req)
    this.wss.socket.emit("botRequest", {
      content: reqData,
      to: this.wss.socket.userID,
    });
  }
}
