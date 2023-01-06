import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrl } from '../../environments/enviroment.dev';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { Post } from '../types/post.interface';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../types/appState.interface';
import * as PostService from '../store/actions'
// import * as PostService from '../'

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  getPost$ = new BehaviorSubject<Post[]>([]);
  constructor(private http: HttpClient, private store : Store<AppStateInterface>) {
    this.store.dispatch(PostService.getPosts())
    // this.loadPost().pipe(take(1)).subscribe((res)=> this.getPost$.next(res as Post[]));
  }
  /**
   * 
   * @returns getall post
   */
  getPosts(): Observable<Post[]> {
    return this.getPost$;
  }
  /**
   * postNewPost to add new post
   * @param post new post object 
   */
  postNewPost(post: Post) {
    const currentPost = this.getPost$.value;
    currentPost.unshift(post);
    this.getPost$.next(currentPost)
  }
  /**
   * load all posts  
   * @returns get all posts
   */
  loadPost():Observable<Post[]> {
    return this.http.get(apiUrl + `/posts`).pipe(
      map((res)=>res as Post[])
    )
  }
}
