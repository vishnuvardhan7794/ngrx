import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, PostsService } from '../../services/posts.service';
import { Injector } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
    public activatedRoute: ActivatedRoute
  ) {
    this.postService = this.injector.get(PostsService);
    this.postForm = this.fb.group({
      title: [null, [Validators.required]],
      body: [null, [Validators.required]],
    });

    this.getDetails$ = this.activatedRoute.params.pipe(
      take(1),
      map((param) => {
        const id = param['id'];
        const getPostdetails = this.postService.getPost$.value.filter((post) => post.id = id);
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
    )
  }

  async submit() {
    const currenPost = this.currenPost$.value;
    try {
      if (currenPost) {
        let allPosts = this.postService.getPost$.value;
        let postIndex = allPosts.findIndex((post) => post.id === currenPost.id);
        if (postIndex > -1) {
          let getPost = allPosts[postIndex];
          getPost.title = this.postForm.value.title;
          getPost.body = this.postForm.value.body;
          allPosts[postIndex] = getPost;
          this.postService.getPost$.next(allPosts);
          this.router.navigate(['/posts']);
          return;
        }

      }
      const user = {
        ...this.postForm.value,
        userId: Math.floor(Math.random() * 1000),
        id: this.postService.getPost$.value.length + 1,
      };
      await this.postService.postNewPost(user);
      this.router.navigate(['/posts']);
    } catch (e) {
      console.log('e', e);
    }
  }
}
