import * as React from 'react';
import { Divider, Avatar, Comment, Tooltip, Button } from 'antd';
import './style.css';
import {
  selectAllBreeds,
  fetchBreeds,
  refreshBreeds,
} from './features/breeds/breedsSlice';
import { useAppSelector, useAppDispatch } from './app/hooks';

import CommentThread from './CommentThread';
import { CommentItem } from './CommentItem';
import EditCategory from './EditCategory';

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
  const dispatch = useAppDispatch();
  const breeds = useAppSelector(selectAllBreeds);

  const postStatus = useAppSelector((state) => state.breeds.status);
  // const error = useSelector((state) => state.posts.error)

  React.useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchBreeds());
      console.log('breeds=', breeds);
    }
  }, [postStatus, dispatch]);

  return (
    <div style={{ padding: '20px' }}>
      <CommentThread userName={userName} defaultData={defaultData} />
      <Divider />
      <Button onClick={() => dispatch(refreshBreeds({ status: 'idle' }))}>
        test
      </Button>
      {
        //console.log('breeds.breeds', breeds.breeds)
        breeds.data.map((b) => (
          <div>{b}</div>
        ))
      }
      <EditCategory />
    </div>
  );
}
