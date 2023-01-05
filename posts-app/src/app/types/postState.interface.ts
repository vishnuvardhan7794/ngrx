import { Post } from "./post.interface";

 export interface PostsStateInterface {
    isLoading : boolean;
    posts: Post[];
    error:string | null
 }