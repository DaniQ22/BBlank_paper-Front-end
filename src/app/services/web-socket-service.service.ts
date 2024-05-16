import { Injectable } from '@angular/core';
import { Client, Message} from '@stomp/stompjs';
import { Observable } from 'rxjs';

import * as SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {
  private client!: Client;

  constructor() { 
    // this.client = new Client({
    //   webSocketFactory: () => new SockJS('http://localhost:8080/chat'),
    //   reconnectDelay: 5000,
    //   debug: (str) => console.log(str),
    // });
  
    // this.client.onStompError = (frame) => {
    //   console.error('Broker reported error: ' + frame.headers['message']);
    //   console.error('Additional details: ' + frame.body);
    // };
  
    // this.client.activate();
  }


  public sendMessage( message: string, recipientEmail: string): void {
    this.client.publish({
      destination: `/app/private-message/${recipientEmail}`, body: message 
    });
  }

  public subscribeToPrivateMessages(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.client.onConnect = () => {
        this.client.subscribe(`/user/${localStorage.getItem('currentUserEmail')}/queue/private`, message => {
          observer.next(message);
        });
      };
    });
  }
}
