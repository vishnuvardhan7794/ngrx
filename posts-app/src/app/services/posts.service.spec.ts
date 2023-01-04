import { TestBed } from '@angular/core/testing';

import { Post, PostsService } from './posts.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [HttpClient]
    });
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  test('should have a getPost return []', (done) => {
    service.getPost$.subscribe((res)=>{
     expect(res).toEqual([]);
     done()
    })
  });
  test('should have add new post', (done) => {
    let post = {
      title: 'test',
      body: 'Testing app',
      userId: "1",
      id:"1"
    }
    service.postNewPost(post as Post);
    service.getPost$.subscribe((res)=>{
     expect(res[0].title).toEqual(post.title);
     expect(res.length).toEqual(1);
     done()
    })
  });
  test('should have get all post', (done) => {
    let post = {
      title: 'test',
      body: 'Testing app',
      userId: "1",
      id:"1"
    }
    service.postNewPost(post as Post);
    service.getPosts().subscribe((res)=>{
     expect(res[0].title).toEqual(post.title);
     expect(res.length).toEqual(1);
     done()
    })
  });
});
