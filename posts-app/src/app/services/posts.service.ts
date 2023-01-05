import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrl } from '../../environments/enviroment.dev';
import { shareReplay, take, tap } from 'rxjs/operators';
import { Post } from '../types/post.interface';



@Injectable({
  providedIn: 'root'
})
export class PostsService {
  getPost$ = new BehaviorSubject<Post[]>([]);
  constructor(private http: HttpClient) {
    this.loadPost().pipe(take(1)).subscribe((res)=>this.getPost$.next(res as Post[]));
  }
  getPosts(): Observable<Post[]> {
    return this.getPost$;
  }
  postNewPost(post: Post) {
    const currentPost = this.getPost$.value;
    currentPost.unshift(post);
    this.getPost$.next(currentPost)
  }
  loadPost() {
    return this.http.get(apiUrl + `/posts`).pipe(
      shareReplay(1),
    );
  }
}
