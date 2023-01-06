import {createAction, props} from "@ngrx/store"
import { Post } from "../types/post.interface"
export const getPosts = createAction('[Posts] Get Posts');
export const addPost = createAction('[Posts] Add Post', props<{payload:Post}>());
export const updatePost = createAction('[Posts] Update Post', props<{payload:Post}>());
export const getPostsSuccess = createAction('[Posts] Get Posts success', props<{posts:Post[]}>())
export const getPostsFailure = createAction('[Posts] Get Posts failure', props<{error:string}>())