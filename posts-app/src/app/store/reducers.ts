import { PostsStateInterface } from "../types/postState.interface"
import {createReducer, on} from '@ngrx/store';
import * as PostsActions from './actions'
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
    }))
)