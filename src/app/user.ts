import { Post } from './post';
export interface User {
  _id: number;
  name: String;
  imgUrl: String;
  posts: Post[];
  password: String;
  sessionId: number;
}
