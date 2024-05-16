import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceUtilsService {
  url = 'http://localhost:8080/';

  constructor() {}

  HandleError(error: HttpErrorResponse): Observable<any> {
    console.error('Objeto de Error Completo:', error);
    let errorMessage = 'Error al procesar la solicitud';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
