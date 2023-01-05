import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { PostsComponent } from './components/posts/posts.component';
import { CreatePostsComponent } from './components/create-posts/create-posts.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { reducers } from './store/reducers';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PostsComponent,
    CreatePostsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}), 
    StoreModule.forFeature('posts', reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly:environment.production,
      autoPause: true
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
