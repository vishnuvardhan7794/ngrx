import { PostsStateInterface } from "../types/postState.interface"
import { createReducer, on } from '@ngrx/store';
import * as PostsActions from './actions'
export const initialState: PostsStateInterface = {
    isLoading: false,
    posts: [],
    error: null
}

export const reducers = createReducer(
    initialState,
    on(PostsActions.getPosts, (state) => ({
        ...state, isLoading: true
    })),
    on(PostsActions.getPostsSuccess, (state, action) => ({
        ...state,
        isLoading: false,
        posts: action.posts
    })),
    on(PostsActions.getPosts, (state) => ({
        ...state,
        isLoading: false,
    })),
    on(PostsActions.addPost, (state, action) => {
        let posts = [...state.posts];
        posts.unshift(action.payload)
        return {
            ...state,
            posts: posts
        }
    }),
    on(PostsActions.updatePost, (state, { payload }) => {
        let posts = [...state.posts];
        let postIndex = posts.findIndex((post) => post.id === payload.id);
        if (postIndex > -1) {
            posts[postIndex] = payload;
        }
        return {
            ...state,
            posts: posts
        }
    })
)