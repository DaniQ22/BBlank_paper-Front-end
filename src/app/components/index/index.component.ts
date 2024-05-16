import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  userLogged!: any;
  isVisible: boolean = true;

  post!: boolean;


  constructor(
    private router: Router
  ) {
    const emailUser = localStorage.getItem('email')
    this.userLogged = emailUser;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event)=> {
      if(this.router.url.includes('/index/profile-user')){
        this.isVisible = false;
      }else if (this.router.url.includes('/index')) {
        this.isVisible = true;
      }
    })

  }


  receiveEventPost(event: boolean) {
    if (event) {
      this.post = false; // Resetea primero a false
      setTimeout(() => {
        this.post = true; // Luego vuelve a establecer a true
      }, 0);
    }
  }

}
