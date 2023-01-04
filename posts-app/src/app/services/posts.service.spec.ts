import { TestBed } from '@angular/core/testing';

import { Post, PostsService } from './posts.service';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('PostsService', () => {
  let service: PostsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClient,
      ],
    });
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have a getPost return []', (done) => {
    service.getPost$.subscribe((res) => {
      expect(res).toEqual([]);
      done();
    });
  });
  it('should have add new post', (done) => {
    let post = {
      title: 'test',
      body: 'Testing app',
      userId: '1',
      id: '1',
    };
    service.postNewPost(post as Post);
    service.getPost$.subscribe((res) => {
      expect(res[0].title).toEqual(post.title);
      expect(res.length).toEqual(1);
      done();
    });
  });
  it('should have get all post', (done) => {
    let post = {
      title: 'test',
      body: 'Testing app',
      userId: '1',
      id: '1',
    };
    service.postNewPost(post as Post);
    service.getPosts().subscribe((res) => {
      expect(res[0].title).toEqual(post.title);
      expect(res.length).toEqual(1);
      done();
    });
  });
  it('shoul make get posts request', (done) => {
    const fakeData = [
      {
        title: 'Testing',
        body: 'Hi test this app',
        id: '1',
        userId: '1',
      },
    ];
    jest.spyOn(service, 'loadPost').mockReturnValue(of(fakeData) as any);
    service.loadPost().subscribe((res:any)=>{
      console.log('res', res);
      expect(res[0].title).toEqual(fakeData[0].title);
      expect(service.getPost$.value[0].title).toEqual(fakeData[0].title)
      done();
    })
  });
});
