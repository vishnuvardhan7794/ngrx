import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Injector } from '@angular/core';
import {
  debounceTime,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as PostService from '../../store/actions'
import { isLoadingSelector, postsSelector } from 'src/app/store/selectors';
import { AppStateInterface } from 'src/app/types/appState.interface';

/**
 * is search string included in post title 
 * @param title post title
 * @param search search string
 * @returns boolean 
 */
const isStringIncludes = (title: string, search: string) => !search || title.toLowerCase().includes(search.toLowerCase());
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  getPost$!: Observable<any>;
  postService!: PostsService;
  searchPost = new FormControl(null);
  isLoading$!:Observable<boolean>
  constructor(
    private injector: Injector,
    private store : Store<AppStateInterface>
    ) {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.postService = this.injector.get(PostsService);
    this.getPost$ = this.searchPost.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      switchMap((search) =>
      this.store.select(postsSelector)
          .pipe(
            map((res) => {
              console.log('res', res)
             return res.filter(
                (post) => isStringIncludes(post.title, search)
              )
            }
              
            )
          )
      )
    );
  }

  ngOnInit(): void { 
    // this.store.dispatch(PostService.)
  }
}
