import * as React from 'react';
import './style.css';
import dayjs from 'dayjs';
import Editor from './CommentEditor';
import relativeTime from 'dayjs/plugin/relativeTime';
import { UserOutlined } from '@ant-design/icons';
import { Input, Avatar, Comment, Tooltip, Button } from 'antd';
import { CommentItem } from './CommentItem';
const { TextArea } = Input;

dayjs.extend(relativeTime);

export default function CommentThread({ defaultData, userName }) {
  const timerRef = React.useRef(null);
  const [data, setData] = React.useState(defaultData);
  const [submitting, setSubmitting] = React.useState(false);

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

  const setCommentProperty = (comment: CommentItem, expression: object) => {
    setData((prevState: CommentItem[]) =>
      prevState.map((el: CommentItem) =>
        el.id === comment.id
          ? Object.assign({}, el, expression)
          : el.children
          ? {
              ...el,
              children: el.children.map((child: CommentItem) =>
                child.id === comment.id
                  ? Object.assign({}, child, expression)
                  : child
              ),
            }
          : el
      )
    );
  };

  const setNodeValue = (nodes, action) => {
    for (const node of nodes) {
      action(node);
      node.children && setNodeValue(node.children, action);
    }
  };

  const removeComment = (commentId: number, parentId: number) => {
    if (!parentId) {
      console.log('removeComment', commentId);
      setData((prev) => prev.filter((item) => item.id !== commentId));
      return;
    }

    const newState = data.map((item: CommentItem) => {
      if (item.id == parentId) {
        console.log('parent', item.id);
        item.children = item.children.filter((child) => {
          return child.id !== commentId;
        });
      }
      return item;
    });

    setData(newState);
  };

  const handleEditClick = (item: CommentItem) => {
    console.log('handleEditClick ', item);
    setNodeValue(data, (item: CommentItem) => (item.editing = false));
    let comment = findNode(data, ({ id }) => id === item.id);
    comment.editing = true;
    setData((prev) => [...data]);
  };

  const handleReplyClick = (item: CommentItem) => {
    console.log('handleReplyClick ', item);
    AddReply(item);
  };

  const handleEditCancelClick = (item: CommentItem) => {
    console.log('handleEditCancelClick ', item);
    let comment = findNode(data, ({ id }) => id === item.id);
    comment.editing = false;
    setData((prev) => [...data]);
  };

  const handleDeleteClick = (item: CommentItem) => {
    console.log('handleDeleteClick ', item);
    setCommentProperty(item, { deleting: true });
    timerRef.current = setTimeout(() => {
      setCommentProperty(item, { deleting: false });

      removeComment(item.id, item.parentId);

      console.log('handleDeleteClick done');
    }, 1000);
  };

  const AddReply = (item: any) => {
    let comment = findNode(data, ({ id }) => id === item.id);

    if (!comment.children) comment.children = [];

    var timeId = new Date().getTime();

    comment.children.push({
      id: timeId,
      author: userName,
      content: '',
      parentId: item.id,
      editing: true,
      replying: true,
      datetime: dayjs().format(),
    });

    console.log(comment);

    setData((prev) => [...data]);
    console.log(data);
  };

  const AddComment = (item: any) => {
    var timeId = new Date().getTime();

    var comment: CommentItem = {
      id: timeId,
      author: userName,
      content: '',
      parentId: item.id,
      editing: true,
      replying: true,
      datetime: dayjs().format(),
    };
    setData((prev) => [...data, comment]);
  };

  const handleSubmit = (item: CommentItem, val: string) => {
    console.log('submitting ', val);

    if (!val) return;

    let comment = findNode(data, ({ id }) => id === item.id);
    setCommentProperty(item, { submitting: true });

    timerRef.current = setTimeout(() => {
      comment.content = val;
      comment.datetime = dayjs().format();
      setNodeValue(data, (item: CommentItem) => (item.editing = false));
      setCommentProperty(item, { submitting: false });
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
              onEdit={handleEditClick}
              onCancelEdit={handleEditCancelClick}
              onReply={handleReplyClick}
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

  return (
    <React.Fragment>
      {data.map(GetComments)}

      <Button type="primary" onClick={AddComment}>
        Add a comment
      </Button>
    </React.Fragment>
  );
}
