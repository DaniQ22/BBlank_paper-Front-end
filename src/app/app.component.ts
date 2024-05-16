import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  showLogin: boolean = true;
  constructor(private route: Router){

  }

  handdleComponent(){

  }

  ngOnInit(): void {
    this.route.events.subscribe((event)=> {
      if(event instanceof NavigationStart)
      if(event.url != '/login'){
        this.showLogin = false;
      }else{
        this.showLogin = true;
      }
    });
  }
}

