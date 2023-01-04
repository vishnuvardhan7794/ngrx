import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrl } from 'src/environments/enviroment.dev';
import {shareReplay, take, tap } from 'rxjs/operators';

export interface Post {
  title: string,
  body: string,
  userId: string,
  id:string
}
export interface Posts extends Post {
  userId: string,
}


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  getPost$ = new BehaviorSubject<Posts[]>([]);
  constructor(private http: HttpClient) {
    this.http.get(apiUrl + `/posts`).pipe(
      tap((res)=> this.getPost$.next(res as Posts[])),
      shareReplay(1),
      take(1)
    ).subscribe();
  }
  getPosts(): Observable<Posts[]> {
    return this.getPost$;
  }
  postNewPost(post:Post) {
    const currentPost = this.getPost$.value;
    currentPost.unshift(post);
    this.getPost$.next(currentPost)
  }
}
