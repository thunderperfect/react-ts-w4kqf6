import * as React from 'react';
import './style.css';

import  CommentThread  from './CommentThread';
import { CommentItem } from './CommentItem';
const userName = 'Michael';

const defaultData: Array<CommentItem> = [
  {
    id: 1,
    parentId: null,
    author: 'Michael',
    content: 'Parent Comment',
    datetime: '2022-09-22 10:56:00',
    editing: false,
    children: [
      {
        id: 2,
        parentId: 1,
        author: 'Angela',
        content: 'single nested comment',
        datetime: '2022-09-22 11:56:00',
        editing: false,
      },
      {
        id: 3,
        parentId: 1,
        author: 'Michael',
        content: 'second nested comment',
        datetime: '2022-09-22 11:56:00',
        editing: false,
      },
    ],
  },
  {
    id: 4,
    parentId: null,
    author: 'Bishop',
    content: 'test2',
    datetime: '2022-09-22 11:56:00',
    editing: false,
  },
];

export default function App() {
  return (
    <div style={{ padding: '20px' }}>
      <CommentThread userName={userName} defaultData={defaultData} />
  
    </div>
  );
}
