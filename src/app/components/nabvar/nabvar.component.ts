import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css'],
})
export class NabvarComponent implements OnInit {
  user: any = {};
  @Output() emitterEventPost = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    
  }
  ngOnInit(): void {
    const emailUse = localStorage.getItem('email');
    if(emailUse) {
      this.getUser(emailUse)
    }
  }

  getUser(email: string) {
    this.userService.getUse(email).subscribe((res) => {
      this.user = res;
      console.log('Usuario obtenido, componente nav', this.user)
      localStorage.setItem('user', this.user.firstNameUser + this.user.lastNameUser)
    });
  }

  isOpenMenu: boolean = false;

  openMen() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  logOut() {
    this.authService.logOut();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  emitEventPost(){
    this.emitterEventPost.emit(true);
  }
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'  // O puedes usar 'auto' para un scroll instantáneo
    });
  }

}
