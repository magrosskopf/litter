import { Comment } from './app/comment';

export interface Post {
  _id: String;
  user: String;
  content: String;
  lits: String[];
  canDoALit: boolean;
  shits: String[];
  canDoAShit: boolean;
  comments: Comment[];
  timestamp: String;
}
