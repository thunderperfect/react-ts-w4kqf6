export class CommentItem {
  id: number;
  parentId?: number;
  author: string;
  content: string;
  datetime: string;
  children?: Array<CommentItem>;
  editing: boolean;
  deleting?: boolean;
  submitting?: boolean;
  replying?: boolean;
}
