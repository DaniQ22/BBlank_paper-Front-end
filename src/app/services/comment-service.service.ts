import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/commentModel';
import { Observable, catchError } from 'rxjs';
import { ServiceUtilsService } from './service-utils.service';
import { getComment } from '../models/getCommentModel';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  constructor(private http: HttpClient,
    private utilService: ServiceUtilsService
  ) { }


  commentPost(comment: Comment):Observable<Comment> {
    return this.http.post<any>(this.utilService.url + 'comment/save', comment, {responseType: 'text' as 'json'}).pipe(
      catchError(this.utilService.HandleError)
    ) 
  }

  getCommentByPost(idArticle: number): Observable<getComment[]>{
    return this.http.get<getComment[]>(this.utilService.url + 'comment/comment-by-post' + idArticle)
  }
}
