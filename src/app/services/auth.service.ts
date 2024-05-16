import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { Observable, ObservableNotification, Subject, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { signUp } from '../models/signUpModel';
import { ServiceUtilsService } from './service-utils.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenInvalidSource = new Subject<void>();
  tokenInvalid$ = this.tokenInvalidSource.asObservable();
  constructor(private http: HttpClient,
    private utilService: ServiceUtilsService
  ) {}

  private url = 'http://localhost:8080/auth';

  login(login: any): Observable<any> {
    return this.http
      .post<any>(this.url + '/login', login, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {

          // Verificar si la respuesta contiene el token
          if(response != null){
            const header = response.headers;
            const bearerToken = header.get('Authorization') || '';
            const token = bearerToken.replace('Bearer ', '');
            const email = response.body.email; // Obtener el correo electrónico del cuerpo de la respuesta
          localStorage.setItem('token', token);
          localStorage.setItem('email', email); // Almac
          }
        }),
      catchError(this.utilService.HandleError)
      )
  }

  logOut() {
    return this.http.post(this.url + '/logout', null);
  }

  signUp(dataSignUp: signUp): Observable<signUp>{
    return this.http.post<signUp>(this.url  + '/register', dataSignUp, { responseType: 'text' as 'json' }).pipe(
      catchError(this.utilService.HandleError)
    );
  }

}
