import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject} from 'rxjs';
import { ChatLibService } from '../chat-lib.service';
import { WebsocketioService } from '../websocketio.service';

@Component({
  selector: 'lib-chat-message-bottom-bar',
  templateUrl: './chat-message-bottom-bar.component.html',
  styleUrls: ['./chat-message-bottom-bar.component.css']
})
export class ChatMessageBottomBarComponent implements OnInit {
  public messageForm = new FormGroup({
    message: new FormControl('', Validators.required)
  });
  message: any;
  public unsubscribe$ = new Subject<void>();
  constructor(public chatService: ChatLibService, public wss: WebsocketioService) {
  }

  ngOnInit() {
  }

  sendMessage() {
    let msg = this.messageForm.controls.message.value;
    if(msg) { 
      this.chatService.chatListPush('sent',msg);
      this.messageForm.controls.message.reset();
      const req = {
        data: {
          body: msg
          }
        }
      const reqData = this.chatService.chatpost(req)
      this.wss.socket.emit("botRequest", {
        content: reqData,
        to: this.wss.socket.userID,
      });
    }
    }
}
