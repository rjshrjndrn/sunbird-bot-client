
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
let uuid = UUID.UUID();

@Injectable({
  providedIn: 'root'
})
export class ChatLibService {

  public chatList = [];
  public userId ;
  public did;
  public appId;
  public channel;
  public chatbotUrl;
  public context;

  constructor() { }

  chatpost(req?: any): Observable<any> {
    if(!this.did) {
      this.did = Date.now();
    }
    const headers = {'x-request-id': uuid };
    const options = { headers: headers };
    req.data['userId'] = this.userId;
    req.data['appId'] = this.appId;
    req.data['channel'] = this.channel;
    req.data['From'] = (this.did).toString();
    req.data['context'] = this.context;
    return req.data;
  }

  chatListPush(source, msg) {
    const chat = {
      'text': msg,
      'type': source
    }
    this.chatList.push(chat);
  }

  chatListPushRevised(source, msg) {
    if(msg.choices){
      for(var val of msg.choices){ 
        val.disabled = false
      }
    }
   
    const chat = {
      'buttons': msg.choices,
      'text': msg.text,
      'type': source
    }
    this.chatList.push(chat);
  }

  disableButtons() {
    var btns =  this.chatList[this.chatList.length-1].buttons
    for(var val of btns){
      val.disabled = true
    }
  }
}
