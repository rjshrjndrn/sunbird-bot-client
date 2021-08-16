import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatMessageListComponent } from './chat-message-list/chat-message-list.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatMessageBottomBarComponent } from './chat-message-bottom-bar/chat-message-bottom-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WebsocketioService } from './websocketio.service';

@NgModule({
  declarations: [ChatWindowComponent, ChatMessageListComponent, ChatMessageComponent, ChatMessageBottomBarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WebsocketioService],
  exports: [ChatWindowComponent, ChatMessageListComponent, ChatMessageComponent, ChatMessageBottomBarComponent]
})
export class ChatLibModule {
}
