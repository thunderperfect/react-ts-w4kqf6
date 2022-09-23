import * as React from 'react';
import './style.css';
import dayjs from 'dayjs';
import Editor from './CommentEditor';
import relativeTime from 'dayjs/plugin/relativeTime';
import { UserOutlined } from '@ant-design/icons';
import { Input, Avatar, Comment, Tooltip, Button } from 'antd';

const { TextArea } = Input;

dayjs.extend(relativeTime);

const userName = 'Michael';

const defaultData = [
  {
    id: 1,
    parentId: null,
    level: 0,
    author: 'Michael',
    content: 'Parent Comment',
    datetime: '2022-09-22 10:56:00',
    children: [
      {
        id: 2,
        parentId: 1,
        level: 1,
        author: 'Michael',
        content: 'single nested comment',
        datetime: '2022-09-22 11:56:00',
      },
      {
        id: 3,
        parentId: 1,
        level: 1,
        author: 'Michael',
        content: 'second nested comment',
        datetime: '2022-09-22 11:56:00',
      },
    ],
  },
  { id: 4, parentId: null, author: 'Michael', content: 'test2', children: [] },
];

export default function App() {
  const timerRef = React.useRef(null);
  const [data, setData] = React.useState(defaultData);
  const [submitting, setSubmitting] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    console.log('useEffect');
    // Clear the interval when the component unmounts
    return () => clearTimeout(timerRef.current);
  }, []);

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

  const removeComment = (commentId, parentId) => {
    if (!parentId) {
      setData(data.filter((item) => item.id !== commentId));
      return;
    }

    const newState = data.map((item) => {
      if (item.id == parentId) {
        console.log('parent', item.id);
        item.children = item.children.filter((child) => {
          return child.id !== commentId;
        });
      }
      return item;
    });

    setData(newState); // or setState(newState) if you are functional

    // setData((prev) => {
    //   const parentIndx = data.findIndex((parent) => parent.id == parentId);
    //   console.log('parentIndx ', parentIndx);
    //   const items = data[parentIndx].children.filter(
    //     (child) => child.id !== commentId
    //   );
    //   const newState = prev;
    //   newState[parentIndx].children = items;
    //   return { ...newState };
    // });
  };

  const handleEditClick = (item) => {
    console.log('handleEditClick ', item);
    setNodeValue(data, (item) => (item.editing = false));
    let comment = findNode(data, ({ id }) => id === item.id);
    comment.editing = true;
    setData((prev) => [...data]);
  };

  const handleEditCancelClick = (item) => {
    console.log('handleEditCancelClick ', item);
    let comment = findNode(data, ({ id }) => id === item.id);
    comment.editing = false;
    setData((prev) => [...data]);
  };

  const handleDeleteClick = (item) => {
    console.log('delehandleDeleteClickting ', item);
    setDeleting(true);

    timerRef.current = setTimeout(() => {
      setDeleting(false);
      //let comment = findNode(data, ({ id }) => id === item.id);
      //delete comment;
      setNodeValue(data, (item) => (item.deleting = false));

      removeComment(item.id, item.parentId);

      // setData((prev) => [...data]);
      console.log('done');
    }, 1000);
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

    setSubmitting(true);

    timerRef.current = setTimeout(() => {
      setSubmitting(false);
      let comment = findNode(data, ({ id }) => id === item.id);
      comment.content = val;
      comment.datetime = dayjs().format();
      setNodeValue(data, (item) => (item.editing = false));

      setData((prev) => [...data]);
      console.log('done');
    }, 1000);
  };

  const GetComments = (item: any) => {
    if (!item) return <React.Fragment />;
    return (
      <React.Fragment>
        <Comment
          key={item.id}
          avatar={<Avatar size="small" icon={<UserOutlined />} />}
          content={
            <Editor
              item={item}
              isAuthor={item.author === userName}
              onSubmit={handleSubmit}
              onDelete={handleDeleteClick}
              onEditClick={handleEditClick}
              onCancelEdit={handleEditCancelClick}
              submitting={submitting}
              deleting={deleting}
            />
          }
          author={item.author}
          children={(item.children || []).map((child: any) =>
            GetComments(child)
          )}
          datetime={
            <Tooltip title={item.datetime}>
              <span>{dayjs().to(dayjs(item.datetime))}</span>
            </Tooltip>
          }
        />
      </React.Fragment>
    );
  };

  return <div style={{ padding: '20px' }}>{data.map(GetComments)}</div>;
}
