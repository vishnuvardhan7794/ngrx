import { PostsStateInterface } from "../types/postState.interface"
import {createReducer, on} from '@ngrx/store';
import * as PostsActions from './actions'
import { Post } from "../types/post.interface";
export const initialState: PostsStateInterface = {
   isLoading:false,
   posts : [],
   error : null
}

export const reducers = createReducer(
    initialState,
    on(PostsActions.getPosts, (state) => ({
        ...state , isLoading:true
    })),
    on(PostsActions.getPostsSuccess, (state, action) => ({
        ...state , 
        isLoading:false,
        posts : action.posts
    })),
    on(PostsActions.getPosts, (state, action) => ({
        ...state ,
         isLoading: false,
    })),
    on(PostsActions.addPost, (state, action)=>{
        let posts = [...state.posts];
        posts.push(action.payload)
        return {
            ...state,
            posts:posts
        }
    }) 
)