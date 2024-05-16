import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NabvarComponent } from './components/nabvar/nabvar.component';
import { PublicatePostComponent } from './components/publicate-post/publicate-post.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatBeetwenUserComponent } from './components/chat-beetwen-user/chat-beetwen-user.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { SuggestPostComponent } from './components/suggest-post/suggest-post.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    NabvarComponent,
    PublicatePostComponent,
    ViewPostComponent,
    ActivateAccountComponent,
    RecoverPasswordComponent,
    ChatComponent,
    ChatBeetwenUserComponent,
    PostDetailComponent,
    SuggestPostComponent,
    ProfileUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
    ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
