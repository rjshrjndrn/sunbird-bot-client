import { inject, TestBed } from '@angular/core/testing';

import { ChatLibService } from './chat-lib.service';

describe('ChatLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[ChatLibService]
  }));

 
  it('should be created', () => {
    const service: ChatLibService = TestBed.get(ChatLibService);
    expect(service).toBeTruthy();
  });

  it('should return formated request data', inject([ChatLibService], (service: ChatLibService) => {
    service.userId = "5d9289860870bc1ab37019c5259fd073"
    service.appId ="prod.diksha.portal"
    service.channel = "ORG_001"
    service.context = "Null"
    const req = {
      data: {"Body":"Hi Tara","userId":"5d9289860870bc1ab37019c5259fd073","appId":"prod.diksha.portal","channel":"ORG_001","From":"5d9289860870bc1ab37019c5259fd073","context":null}
    }
    let requData = service.chatpost(req);
    expect(requData).toBeDefined();
    expect(requData['From']).toBeDefined();
  }));

  it('should add sent message to chat list', inject([ChatLibService], (service: ChatLibService) => {
    service.chatListPush('sent', 'Hi Tara');
    expect(service.chatList).toBeDefined();
  }));

  
  it('should add received message to chat list', inject([ChatLibService], (service: ChatLibService) => {
    const rcvObj = {
      text: "Hello, I am Tara! I am your DIKSHA guide",
      choices: [
        {text: "Digital Content", value: "1"},
        {text: "Course", value: "2"}
      ]
    }
    service.chatListPushRevised('recieved', rcvObj);
    expect(service.chatList[0]).toEqual({
      type: "recieved",
      text: "Hello, I am Tara! I am your DIKSHA guide",
      buttons: [
        {text: "Digital Content", value: "1", disabled: false},
        {text: "Course", value: "2", disabled: false}
      ]
    });
  }));


  it('should disabled the button', inject([ChatLibService], (service: ChatLibService) => {
    const rcvObj = {
      text: "Hello, I am Tara! I am your DIKSHA guide",
      choices: [
        {text: "Digital Content", value: "1"},
        {text: "Course", value: "2"}
      ]
    }
    service.chatListPushRevised('recieved', rcvObj);
    service.disableButtons();
    expect(service.chatList[0]).toEqual({
      type: "recieved",
      text: "Hello, I am Tara! I am your DIKSHA guide",
      buttons: [
        {text: "Digital Content", value: "1", disabled: true},
        {text: "Course", value: "2", disabled: true}
      ]
    });
  }));

});
