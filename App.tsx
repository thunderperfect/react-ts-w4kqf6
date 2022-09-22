import * as React from 'react';
import './style.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, List, Avatar, Comment, Tooltip } from 'antd';

const { TextArea } = Input;

dayjs.extend(relativeTime);

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
  const [comments, setComments] = React.useState([]);
  const [submitting, setSubmitting] = React.useState(false);
  const [value, setValue] = React.useState('');

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

  const handleCommmentContentChange = (e, item) => {
    let comment = findNode(data, ({ id }) => id === item.id);
    comment.content = e.target.value;
    setData((prev) => [...data]);
    console.log(e.target.value);
  };

  const handleEditClick = (item) => {
    console.log(item);
    setNodeValue(data, (item) => (item.editing = false));
    let comment = findNode(data, ({ id }) => id === item.id);
    comment.editing = true;
    setData((prev) => [...data]);
  };

  const AddComment = (item: any) => {
    let comment = findNode(data, ({ id }) => id === 3);
    comment.children.push({
      id: 0,
      author: 'Bishop',
      content: 'test2',
      children: [],
    });

    console.log(comment);

    setData((prev) => [...data]);

    console.log(data);
  };
  interface EditorProps {
    item: any;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>, item: any) => void;
    onSubmit: () => void;
    onEditClick: (item: any) => void;
    submitting: boolean;
    value: string;
    isAuthor: boolean;
  }
  const Editor = ({
    item,
    isAuthor,
    onChange,
    onSubmit,
    submitting,
    onEditClick,
    value,
  }: EditorProps) => {
    return (
      <React.Fragment>
        <Form.Item noStyle>
          {isAuthor && item.editing && (
            <TextArea
              placeholder="Autosize height with minimum and maximum number of lines"
              autoSize={false}
              onChange={(e) => onChange(e, item)}
              value={value}
              allowClear
              size="small"
            />
          )}
          {(!isAuthor || !item.editing) && (
            <React.Fragment>
              <div
                style={{
                  border: '1px solid #DCDCDC',
                  padding: '0px 0px 2px 5px',
                }}
              >
                {value}
              </div>
            </React.Fragment>
          )}
        </Form.Item>
        <Form.Item noStyle>
          {isAuthor && (
            <Button
              htmlType="submit"
              loading={!submitting}
              onClick={() => onEditClick(item)}
              type="link"
              size="small"
              disabled={!isAuthor || item.editing}
            >
              Edit
            </Button>
          )}
          <Button
            htmlType="submit"
            loading={!submitting}
            onClick={onSubmit}
            type="link"
            size="small"
          >
            Add a comment
          </Button>
        </Form.Item>
      </React.Fragment>
    );
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
            onChange={handleCommmentContentChange}
            onSubmit={() => AddComment()}
            onEditClick={handleEditClick}
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
