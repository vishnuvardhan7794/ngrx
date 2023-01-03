import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.scss'],
})
export class CreatePostsComponent implements OnInit {
  postForm: FormGroup;
  constructor(private fb: FormBuilder, private postService: PostsService) {
    this.postForm = this.fb.group({
      title: [null, [Validators.required]],
      comment: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}
  async submit() {
    try {
      const user = {
        ...this.postForm.value,
        userId: Math.floor(Math.random() * 1000),
      };
      await this.postService.postNewPost(user).toPromise();
    } catch (e) {
      console.log('e', e);
    }
  }
}
