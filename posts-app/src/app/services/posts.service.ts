import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/enviroment.dev';
import { map, tap } from 'rxjs/operators'
export interface Post {
  title: string,
  body: string,
  userId: string,
}
export interface PostList extends Post {
  userId: string,
}


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {
  }
  getPosts(): Observable<PostList[]> {
    return this.http.get(apiUrl + `/posts`).pipe(
      map((res) => res as PostList[]),
      // tap((res) => console.log('res', res))
    );
  }
  postNewPost(post:Post): Observable<any> {
    return this.http.post(apiUrl + '/posts', post)
  }
}
