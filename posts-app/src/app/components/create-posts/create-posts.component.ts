import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Injector } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Post } from '../../types/post.interface';
import { Store } from '@ngrx/store';
import * as PostActions from '../../store/actions'
import { postsSelector } from 'src/app/store/selectors';
import { AppStateInterface } from 'src/app/types/appState.interface';
@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.scss'],
})
export class CreatePostsComponent {
  postForm: FormGroup;
  postService!: PostsService;
  getDetails$!: Observable<any>;
  currenPost$ = new BehaviorSubject<Post | null>(null)
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private injector: Injector,
    public activatedRoute: ActivatedRoute,
    private store: Store<AppStateInterface>
  ) {
    this.postService = this.injector.get(PostsService);
    this.postForm = this.fb.group({
      title: [null, [Validators.required]],
      body: [null, [Validators.required]],
    });

    this.getDetails$ = this.activatedRoute.params.pipe(
      map((param) => param['id']),
      switchMap((id) => this.store.select(postsSelector).pipe(
        map((posts) => {
          const getPostdetails = posts.filter((post) => post.id == id);
          if (getPostdetails.length > 0) {
            const data = getPostdetails[0]
            this.currenPost$.next(data);
            this.postForm.setValue({
              title: data.title,
              body: data.body
            })
          }
          return of(true)
        })
      )),
      take(1),
    )
  }

  async submit() {
    const currenPost = this.currenPost$.value;
    try {
      if (currenPost) {
          const updatedPost = {
            title: this.postForm.value.title,
            body : this.postForm.value.body,
            id:currenPost.id,
            userId: currenPost.userId
          }
          this.store.dispatch(PostActions.updatePost({payload:updatedPost}))
          this.router.navigate(['/posts']);
          return;
      }
      const user = {
        ...this.postForm.value,
        userId: Math.floor(Math.random() * 1000),
        id: Math.floor(Math.random() * 1000),
      };
      await this.store.dispatch(PostActions.addPost({ payload: user }));
      this.router.navigate(['/posts']);
    } catch (e) {
      console.log('e', e);
    }
  }
}
