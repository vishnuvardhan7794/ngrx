import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostsComponent } from './create-posts.component';
import { PostsService } from '../../services/posts.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('CreatePostsComponent', () => {
  let component: CreatePostsComponent;
  let fixture: ComponentFixture<CreatePostsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePostsComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should post form initilize', () => {
    expect(component).toBeTruthy();
    expect(component.postForm).toBeDefined();
    expect(component.postForm.get('title')?.value).toEqual(null);
    expect(component.postForm.get('body')?.value).toEqual(null);
  });
  it('should add details to post form', () => {
    const post = {
      title: 'testing',
      body: 'New post',
    };
    component.postForm.patchValue({
      title: post.title,
      body: post.body,
    });
    expect(component.postForm.get('title')?.value).toEqual(post.title);
    expect(component.postForm.get('body')?.value).toEqual(post.body);
  });
  it('should submit button enabled', () => {
    const button = fixture.debugElement.query(By.css('button.btn'));
    expect(button.nativeElement.getAttribute('disabled')).toEqual('');
    const post = {
      title: 'testing',
      body: 'New post',
    };
    component.postForm.patchValue({
      title: post.title,
      body: post.body,
    });
    fixture.detectChanges();
    expect(button.nativeElement.getAttribute('disabled')).toEqual(null);
  });
  it('should get post details', (done) => {
    const getPostById = {
      title: 'Testingasa',
      body: 'Vishnu i am new user',
      id: '1',
      userId: '1'
    }
    // component.postService.postNewPost(getPostById)
    component.getDetails$.subscribe(() => {
      expect(component.currenPost$.value?.id).toEqual(getPostById.id);
      expect(component.postForm.get('title')?.value).toEqual(getPostById.title);
      done()
    })
  })
});
