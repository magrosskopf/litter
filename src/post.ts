export interface Post {
  _id: String;
  user: String;
  content: String;
  lits: number;
  canDoALit: boolean;
  shits: number;
  canDoAShit: boolean;
  comments: Comment;
  timestamp: String;
}
