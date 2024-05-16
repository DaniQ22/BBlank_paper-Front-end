import { Injectable } from '@angular/core';
import { ServiceUtilsService } from './service-utils.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { formArticle } from '../models/formArticle';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private serviceUtil: ServiceUtilsService,
    private http: HttpClient) { }

    getAllPosts(pageNumber: number, pageSize: number): Observable<any[]> {
      let params = new HttpParams();
      params = params.append('page', pageNumber.toString());
      params = params.append('size', pageSize.toString());
      params = params.append('sort', 'publicationDate,desc')
      return this.http.get<any[]>(this.serviceUtil.url + 'article/articles', { params })
    }

    saveArticle(formData: FormData): Observable<any> {
      return this.http.post(this.serviceUtil.url + 'article/post', formData, { responseType: 'text' }).pipe(
        catchError(this.serviceUtil.HandleError)
      );
    }

    deleteArticle(idArticle: number): Observable<any>{
      return this.http.delete<any>(this.serviceUtil.url + 'article/delete/' + idArticle, {responseType: 'text' as 'json'}).pipe(
        catchError(this.serviceUtil.HandleError)
      )
    }

    likeArticle(idArticle: number): Observable<any>{
      return this.http.post<any>(this.serviceUtil.url + 'article/like-article/' + idArticle, null)
    }

    getAllLikes(): Observable<any[]>{
      return this.http.get<any[]>(this.serviceUtil.url + 'likes/all-likes');
    }

    dontLike(idArticle: number): Observable<any>{
      return this.http.post<any>(this.serviceUtil.url + 'article/dislike-article/'+ idArticle, null)
    }

}
