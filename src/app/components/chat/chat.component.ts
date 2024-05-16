import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, catchError, of } from 'rxjs';
import { UserModel } from 'src/app/models/userModel';
import { UserService } from 'src/app/services/user.service';
import { Message } from '@stomp/stompjs';
import { WebSocketServiceService } from 'src/app/services/web-socket-service.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  listUser: UserModel[] = [];

  messages: string[] = [];
  private subscription!: Subscription;

  constructor(private userService: UserService,
    private webSocketService: WebSocketServiceService)
    {}

  ngOnInit(): void {
    this.getAllUser();

    // this.subscription = this.webSocketService.subscribeToPrivateMessages().subscribe((message: Message) => {
    //   this.messages.push(message.body);
    // });
  }

  getAllUser() {
    this.userService.getAllUser().pipe(
      catchError(error => {
        console.error('Error al obtener usuarios', error);
        return of([]); // Retorna un arreglo vacío en caso de error
      })
    ).subscribe(res => {
      this.listUser = res;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sendMessage(message: string, recipientEmail: string): void {
    this.webSocketService.sendMessage(message, recipientEmail);
  }

}
