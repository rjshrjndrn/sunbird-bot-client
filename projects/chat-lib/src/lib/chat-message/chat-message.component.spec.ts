import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WebsocketioService } from '../websocketio.service';
import { ChatLibService } from '../chat-lib.service';

import { ChatMessageComponent } from './chat-message.component';

describe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;
  const buttonsMock = {
    buttons: [
      {text: 'Option 1', value: '1'},
      {text: 'Option 2', value: '2'},
    ]
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageComponent ],
      providers: [ChatLibService, WebsocketioService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;
    component.data = {};
    fixture.detectChanges();
  });

  it('should not set buttons if data input has not button object', () => {
    component.data = [];
    component.ngOnInit()
    expect(component.isButtonAvailable).toBeFalsy()
    expect(component.buttons).toEqual('')
  });

  
  it('should set buttons if data input has button object', () => {
    component.data = buttonsMock;
    component.ngOnInit()
    expect(component.isButtonAvailable).toBeTruthy()
    expect(component.buttons).toEqual(buttonsMock.buttons)
  });

  it('should call sendMessage on click on option button', () => {
    component.data = buttonsMock;
    spyOn(component, 'disableButtons')
    spyOn(component, 'sendMessage')
    component.buttonClicked(1, '1');
    expect(component.disableButtons).toHaveBeenCalled()
    expect(component.sendMessage).toHaveBeenCalled()
  });

  it('should disabled the button', () => {
    const chatService = TestBed.get(ChatLibService);
    spyOn(chatService, 'disableButtons')
    component.disableButtons();
    expect(chatService.disableButtons).toHaveBeenCalled()
  });

  
  xit('should send message using socket service', () => {
    const wss = TestBed.get(WebsocketioService);
    const chatService = TestBed.get(ChatLibService);
    spyOn(chatService, 'chatpost').and.returnValue({})
    component.sendMessage({ data: { body: 1 } });
    expect(component.sendMessage).toHaveBeenCalled()
  });

});
