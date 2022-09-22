import * as React from 'react';
import './style.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Button, Form, Input } from 'antd';

const { TextArea } = Input;

dayjs.extend(relativeTime);

const userName = 'Michael';
interface EditorProps {
  item: any;
  //onChange: (e: React.ChangeEvent<HTMLTextAreaElement>, item: any) => void;
  onSubmit: (item: any, newContentValue: string) => void;
  onEditClick: (item: any) => void;
  onCancelEdit: (item: any) => void;
  submitting: boolean;
}
export default function Editor({
  item,
  onSubmit,
  submitting,
  onEditClick,
  onCancelEdit,
}: EditorProps) {
  const contentCopyRef = React.useRef(item.content);
  const [contentCopy, setContentCopy] = React.useState(contentCopyRef.current);

  const handleCancelEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onCancelEdit(item);
    setContentCopy(contentCopyRef.current);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    onSubmit(item, contentCopy);
    contentCopyRef.current = contentCopy;
  };

  const handleOnChange = (e: { target: { value: any; }; }) => {
    setContentCopy(e.target.value);
  };

  const handleOnEditClick = (e) => {
    onEditClick(item);
  };

  console.log('render', item);
  return (
    <React.Fragment>
      {item.editing && (
        <Form.Item
          help={!contentCopy && 'Please provide a comment'}
          validateStatus={!contentCopy ? 'error' : 'success'}
          style={{ marginBottom: 0 }}
        >
          <TextArea
            placeholder="Autosize height with minimum and maximum number of lines"
            autoSize={false}
            onChange={handleOnChange}
            value={contentCopy}
            size="small"
          />
        </Form.Item>
      )}
      {!item.editing && (
        <React.Fragment>
          <div
            style={{
              border: '1px solid #DCDCDC',
              padding: '0px 0px 2px 5px',
            }}
          >
            {contentCopy}
          </div>
        </React.Fragment>
      )}
      <Form.Item noStyle style={{ border: '1px solid silver' }}>
        <Button
          onClick={handleOnEditClick}
          type="link"
          size="small"
          disabled={item.editing}
        >
          Edit
        </Button>

        {item.editing && (
          <React.Fragment>
            <Button
              onClick={handleCancelEdit}
              type="link"
              size="small"
              disabled={submitting}
            >
              Cancel
            </Button>

            <Button
              htmlType="submit"
              loading={submitting}
              onClick={handleSubmit}
              type="link"
              size="small"
            >
              Save Changes
            </Button>
          </React.Fragment>
        )}
      </Form.Item>
    </React.Fragment>
  );
}
