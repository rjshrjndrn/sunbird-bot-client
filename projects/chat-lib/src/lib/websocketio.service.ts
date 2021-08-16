import { Injectable } from '@angular/core';
import { io } from "socket.io-client";



@Injectable({
  providedIn: 'root'
})
export class WebsocketioService {

  public socket
  constructor() { }

  public initSocketConnection(socketURl) {
    const URL = socketURl;
    this.socket = io(URL, { 
      transports: ['websocket'],
      autoConnect: false 
    });

    const sessionID = localStorage.getItem("sessionID");
    const userID = localStorage.getItem("userID");
    if (sessionID) {
      this.socket.auth = { sessionID, userID };
      this.socket.connect();
    } else {
      this.socket.connect();
    }

    this.socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      this.socket.auth = { sessionID, userID };
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionID);
      localStorage.setItem("userID", userID);
      // save the ID of the user
      this.socket.userID = userID;
    });

    this.socket.on("connect_error", (err) => {
    });

  }

  public destroyWSConnection() {
    this.socket.off("connect_error");
    this.socket.off("connect");
    this.socket.off("botRequest");
  }


}
 