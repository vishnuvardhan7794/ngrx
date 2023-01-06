import { Injectable } from "@angular/core";
 import { Actions, createEffect, ofType} from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { PostsService } from "../services/posts.service";
 import * as PostsActions from './actions'
@Injectable()
export class PostsEffects {
constructor(private actions$:Actions, private postsService:PostsService){}
  getPosts$ = createEffect(() => {
   return this.actions$.pipe(ofType(PostsActions.getPosts), 
   mergeMap(()=>{
    return this.postsService.loadPost().pipe(map((posts)=> PostsActions.getPostsSuccess({posts})))
   }),
   catchError((error)=>{
    return of(PostsActions.getPostsFailure({error:error?.message}))
   }))
  })
}