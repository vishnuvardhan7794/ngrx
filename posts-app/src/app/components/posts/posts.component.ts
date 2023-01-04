import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Injector } from '@angular/core';
import {
  debounceTime,
  map,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  getPost$!: Observable<any>;
  postService!: PostsService;
  searchPost = new FormControl(null);
  constructor(private injector: Injector) {
    this.postService = this.injector.get(PostsService);
    this.getPost$ = this.searchPost.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      switchMap((search) =>
        this.postService
          .getPosts()
          .pipe(
            map((res) =>
              res.filter(
                (post) =>
                  !search ||
                  post.title.toLowerCase().includes(search.toLowerCase())
              )
            )
          )
      )
    );
  }

  ngOnInit(): void { }
}
