import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  getPost$!:Observable<any>;
  constructor(private postsService: PostsService) {
    this.getPost$ = this.postsService.getPosts();
    this.getPost$.subscribe((posts)=>{
      console.log('posts' , posts)
    })
   }

  ngOnInit(): void {
  }

}
