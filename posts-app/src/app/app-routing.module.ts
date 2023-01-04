import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { PostsComponent } from './components/posts/posts.component';
import { CreatePostsComponent } from './components/create-posts/create-posts.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'createpost',
        component: CreatePostsComponent,
      },
      {path: 'post/:id/details', component:CreatePostsComponent, pathMatch: 'full'}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
