import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { InputValues } from '../../model/input'
import { ChatLibService } from '../chat-lib.service';
import { WebsocketioService } from '../websocketio.service';
@Component({
  selector: 'lib-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  @Input() inputValues: InputValues
  isImageFromSrc: boolean = false;
  constructor(public wss: WebsocketioService, public chatService: ChatLibService) { }
  ngOnInit() {
    this.wss.initSocketConnection(this.inputValues.socketUrl)
    this.inputValues.collapsed = true;
    this.isImageFromSrc = this.inputValues.imageUrl ? true : false
    this.inputValues.title = this.inputValues.title ? this.inputValues.title : 'Ask Bot'
    this.inputValues.imageUrl = this.inputValues.imageUrl ? this.inputValues.imageUrl : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAD/h4/MvwAAAAd0SU1FB+QGCgIbMsOZqIQAAABhelRYdFJhdyBwcm9maWxlIHR5cGUgZXhpZgAACNfjSq3ITONSAAMzIy4TU3MLM0szMwMgMEkxSTEwMEo0gAALIDa0MDezBElBxQyhFEwNCIA0GHFhKjJOBkoYYxOH6eQCAP3fHFqhHHkhAAACIElEQVQ4y42Vu2sUURSHv3vnro+QIhrbQAQJiKWKKDGID8gfIBY2aWxUsPRRmMomVkJKC8FWOxvTiRKrgCCIj0CKgFiEVVGjicnOZzH7ml13N/dWc+75zu887swEASAgBAatdm8IdUNiqHEygA7krBdoMCCRZ1zgL3EHeI3IDE/JqBXuw0xSIeDAnZMxxIki51RPJvKbQ3yn0jf5xDduMsd247FYEfjFHzZCH9gEbNLsbGo7C0CQZie7exzKB6nLR+5ynnVjmz1R5TrV7iq6B3mGKWpkpfFscY9q50XohANyiWNEbLpKxjKfCOQDlANUWfh/vzp72aWsTDPJBuWa13jI5qC0cwKznCQvwYEai7zpvIEtOBCBSM4NpsnbhiKJZd5CyVqCJae4LEss9ZhzrAeoGxqJ1EicIrJNTmIPFds2FTIigU1goo0yiEN+UfW9tx0TMRpKb0QUg5ddNldnxSRY4FPOu6rqTx97qgPPxDGfq/rOO46KrY4YxBEv+sQtteYjR+rWAj3iirrmVStNO63YqW487Lw/1NceEIOZeNTP6ksPitFUwC3lQj3Vkz3uB/WKuEuccFVdcFgaYMdda2tNEse95qiIe11UX7mvXkDvr0UzQKvaOXXF8YFoCU9m4qS5eq4YzQC0LUih/UJ9sCPVkn4mzqgf3d8YTueKfXg4C9znK2ln/5OWchRPe8vdvRMO/UP0dwx9sUjGdu+U/wGT1Y+s2y0FmQAAADhleElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAPKADAAQAAAABAAAAPAAAAADs/UvMAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA2LTEwVDAyOjI3OjUwLTA3OjAwz2RkkQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wNi0xMFQwMjoyNzo1MC0wNzowML453C0AAAAXdEVYdGV4aWY6RXhpZkltYWdlTGVuZ3RoADYw94uaxQAAABZ0RVh0ZXhpZjpFeGlmSW1hZ2VXaWR0aAA2MLp5J0AAAAASdEVYdGV4aWY6RXhpZk9mZnNldAAyNlMbomUAAAAASUVORK5CYII=';
    this.inputValues.header = this.inputValues.header ? this.inputValues.header : 'ChatBot'
  }
  
  listenBotResponse() {
    this.wss.socket.on("botResponse", ({ content, from }) => {
      this.chatService.chatListPushRevised('recieved', content)
    });
  }

  expandChatIntent() {
    this.inputValues.collapsed = false;
    this.listenBotResponse()
  }
  collapseChatIntent() {
    this.inputValues.collapsed = true;
    this.wss.destroyWSConnection()
  }
}
