import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrl } from '../../environments/enviroment.dev';
import {shareReplay, take, tap } from 'rxjs/operators';

export interface Post {
  title: string,
  body: string,
  userId: string,
  id: string
}


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  getPost$ = new BehaviorSubject<Post[]>([]);
  constructor(private http: HttpClient) {
    this.loadPost();
  }
  getPosts(): Observable<Post[]> {
    return this.getPost$;
  }
  postNewPost(post:Post) {
    const currentPost = this.getPost$.value;
    currentPost.unshift(post);
    this.getPost$.next(currentPost)
  }
  loadPost(){
    this.http.get(apiUrl + `/posts`).pipe(
      tap((res)=> this.getPost$.next(res as Post[])),
      shareReplay(1),
      take(1)
    ).subscribe();
  }
}
