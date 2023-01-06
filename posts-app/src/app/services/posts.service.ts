import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../environments/enviroment.dev';
import { map} from 'rxjs/operators';
import { Post } from '../types/post.interface';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../types/appState.interface';
import * as PostService from '../store/actions'


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient, private store : Store<AppStateInterface>) {
    // this.store.dispatch(PostService.getPosts())
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
