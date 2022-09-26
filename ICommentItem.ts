export interface ICommentItem {
  id: number;
  parentId?: number;
  author: string;
  content: string;
  datetime: string;
  children?: Array<ICommentItem>;
  editing: boolean;
  deleting?: boolean;
  submitting?: boolean;
}
