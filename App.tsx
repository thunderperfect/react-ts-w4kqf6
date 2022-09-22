import * as React from 'react';
import './style.css';
import dayjs from 'dayjs';
import Editor from './CommentEditor';
import relativeTime from 'dayjs/plugin/relativeTime';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, List, Avatar, Comment, Tooltip } from 'antd';

const { TextArea } = Input;

dayjs.extend(relativeTime);

const userName = 'Michael';

const defaultData = [
  {
    id: 1,
    author: 'Michael',
    content: 'Parent Nested Comment',
    datetime: '2022-09-22 10:56:00',
    children: [
      {
        id: 2,
        author: 'Michael',
        content: 'single nested comment',
        datetime: '2022-09-22 11:56:00',
        children: [
          {
            id: 3,
            author: 'Angela',
            content: 'doubled nested comment',
            children: [],
          },
        ],
      },
    ],
  },
  { id: 4, author: 'Michael', content: 'test2', children: [] },
];

export default function App() {
  const [data, setData] = React.useState(defaultData);
  const [submitting, setSubmitting] = React.useState(false);

  const findNode = (nodes, predicate) => {
    for (const node of nodes) {
      if (predicate(node)) return node;

      if (node.children) {
        let match = findNode(node.children, predicate);
        if (match) return match;
      }
    }
  };

  const setNodeValue = (nodes, action) => {
    for (const node of nodes) {
      action(node);
      node.children && setNodeValue(node.children, action);
    }
  };

  const handleEditClick = (item) => {
    console.log(item);
    setNodeValue(data, (item) => (item.editing = false));
    let comment = findNode(data, ({ id }) => id === item.id);
    comment.editing = true;
    setData((prev) => [...data]);
  };

  const handleEditCancelClick = (item) => {
    console.log(item);
    let comment = findNode(data, ({ id }) => id === item.id);
    comment.editing = false;
    setData((prev) => [...data]);
  };

  const AddComment = (item: any) => {
    let comment = findNode(data, ({ id }) => id === 3);
    comment.children.push({
      id: 0,
      author: userName,
      content: 'test2',
      children: [],
    });

    console.log(comment);

    setData((prev) => [...data]);
    console.log(data);
  };

  const handleSubmit = (item, val) => {
    console.log('submitting ', val);

    if (!val) return;

    let comment = findNode(data, ({ id }) => id === item.id);
    comment.content = val;
    setData((prev) => [...data]);
    console.log('done');
  };

  const GetComments = (item: any) => {
    if (!item) return <React.Fragment />;
    return (
      <Comment
        avatar={<Avatar size="small" icon={<UserOutlined />} />}
        content={
          <Editor
            item={item}
            isAuthor={item.author === 'Michael'}
            onSubmit={handleSubmit}
            onEditClick={handleEditClick}
            onCancelEdit={handleEditCancelClick}
            submitting={true}
            value={item.content}
          />
        }
        author={item.author}
        children={(item.children || []).map((child: any) => GetComments(child))}
        datetime={
          <Tooltip title={item.datetime}>
            <span>{dayjs().to(dayjs(item.datetime))}</span>
          </Tooltip>
        }
      />
    );
  };

  return <div style={{ padding: '20px' }}>{data.map(GetComments)}</div>;
}
