import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValuesFromArray, catchError } from 'rxjs';
import { ServiceUtilsService } from './service-utils.service';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private utilService: ServiceUtilsService
  ) { }

  activateAccount(email: string): Observable<any> {
    return this.http.post<any>(this.utilService.url  + 'user/activate-account/' + email, null);
  }

  getUse(emailUser: string): Observable<any>{
    return this.http.get<any>(this.utilService.url +  'user/get-user/' + emailUser)
  }
  getAllUser():Observable<UserModel[]>{
    const emailUser = localStorage.getItem('email')
    return this.http.get<UserModel[]>(this.utilService.url + 'user/all/' + emailUser)
  }
  getIdUserByEmail(email: string): Observable<number>{
    return this.http.get<number>(this.utilService.url + 'user/get-id-user/' + email)
  }

  updateImageUser(formData: FormData): Observable<any> {
    return this.http.post<any>(this.utilService.url + 'user/update-image-user', formData).pipe(
      catchError(this.utilService.HandleError)
    );
  }
}
