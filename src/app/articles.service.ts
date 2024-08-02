import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Article } from './article';
import { Comment } from './comment'; 

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private apiURL = 'http://127.0.0.1:8000/api/articles';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL)
      .pipe(
        catchError(this.errorHandler)
      );
  }  

  create(article: Article): Observable<any> {
    return this.httpClient.post(this.apiURL , JSON.stringify(article), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  find(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL +id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id: number, article: Article): Observable<any> {
    return this.httpClient.put(this.apiURL +id, JSON.stringify(article), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.apiURL + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.apiURL}${postId}/comments`)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any) {
    let errorMessage = '';
    if (typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
