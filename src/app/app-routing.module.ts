import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { loginGuards } from './guards/guard';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ChatBeetwenUserComponent } from './components/chat-beetwen-user/chat-beetwen-user.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent,
    
    
  },
  {
    path: 'index', 
    component: IndexComponent,
    canActivate: [
      loginGuards
    ],
    children: [
      {
        path: 'profile-user', component: ProfileUserComponent
      }
    ]
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent
  },
  {
    path: 'chat-user',
    component: ChatBeetwenUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
