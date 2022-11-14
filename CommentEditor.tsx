import React from 'react';
import './style.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Button, Form, Input, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { CommentItem } from './CommentItem';
const { TextArea } = Input;

dayjs.extend(relativeTime);

const userName = 'Michael';
interface EditorProps {
  item: CommentItem;
  isAuthor: boolean;
  onSubmit: (item: CommentItem, newContentValue: string) => void;
  onEdit: (item: CommentItem) => void;
  onCancelEdit: (item: CommentItem) => void;
  onReply: (item: CommentItem) => void;
  onDelete: (item: CommentItem) => void;
}
export default function Editor({
  item,
  isAuthor,
  onSubmit,
  onDelete,
  onEdit,
  onReply,
  onCancelEdit,
}: EditorProps) {
  const contentCopyRef = React.useRef(item.content);
  const [contentCopy, setContentCopy] = React.useState(contentCopyRef.current);
  const showReply = !item.parentId;

  const handleCancelEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onCancelEdit(item);
    setContentCopy(contentCopyRef.current);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onSubmit(item, contentCopy);
    contentCopyRef.current = contentCopy;
  };

  const handleOnChange = (e: { target: { value: any } }) => {
    setContentCopy(e.target.value);
  };

  const handleOnEditClick = () => {
    onEdit(item);
  };

  const handleDeleteClick = () => {
    onDelete(item);
  };

  const handleReplyClick = (e) => {
    onReply(item);
  };

  const ButtonSpacer = () => <span style={{ color: 'silver' }}> | </span>;

  console.log('render', item);
  return (
    <React.Fragment>
      {isAuthor && item.editing && (
        <Form.Item
          help={!contentCopy && 'Please provide a comment'}
          validateStatus={!contentCopy ? 'error' : 'success'}
          style={{ marginBottom: 0 }}
        >
          <TextArea
            placeholder="Add comments to ask for more information or suggest improvements"
            autoSize={false}
            autoFocus
            onChange={handleOnChange}
            value={contentCopy}
            size="small"
          />
        </Form.Item>
      )}
      {!item.editing && (
        <React.Fragment>
          <div
            style={
              {
                //border: '1px solid #DCDCDC',
                //padding: '0px 0px 2px 5px',
              }
            }
          >
            {contentCopy}
          </div>
        </React.Fragment>
      )}
      {showReply && (
        <React.Fragment>
          <Button
            style={{ paddingLeft: 0 }}
            onClick={handleReplyClick}
            type="link"
            size="small"
            disabled={item.editing}
          >
            Reply
          </Button>
        </React.Fragment>
      )}
      {showReply && isAuthor && <ButtonSpacer />}
      {isAuthor && (
        <Form.Item noStyle style={{ border: '1px solid silver' }}>
          <Button
            style={!showReply ? { paddingLeft: 0 } : { paddingLeft: 'auto' }}
            onClick={handleOnEditClick}
            type="link"
            size="small"
            disabled={item.editing}
          >
            Edit
          </Button>

          {item.editing && (
            <React.Fragment>
              <ButtonSpacer />
              <Button
                onClick={item.replying ? handleDeleteClick : handleCancelEdit}
                type="link"
                size="small"
                disabled={item.submitting}
              >
                Cancel
              </Button>
              <ButtonSpacer />
              <Button
                htmlType="submit"
                loading={item.submitting}
                onClick={handleSubmit}
                type="link"
                size="small"
              >
                Save Changes
              </Button>
            </React.Fragment>
          )}
          <ButtonSpacer />
          <Popconfirm
            disabled={item.editing}
            onConfirm={handleDeleteClick}
            title={
              item.children
                ? 'Are you sure you want to delete this comment thread?'
                : 'Are you sure you want to delete this comment?'
            }
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button
              loading={item.deleting}
              disabled={item.editing}
              type="link"
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Form.Item>
      )}
    </React.Fragment>
  );
}
