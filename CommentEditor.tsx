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
  value: string;
}
export default function Editor({
  item,
  onSubmit,
  submitting,
  onEditClick,
  onCancelEdit,
  value,
}: EditorProps) {
  const [contentCopy, setContentCopy] = React.useState(value);
  console.log('render');
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
            onChange={(e) => setContentCopy(e.target.value)}
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
            {value}
          </div>
        </React.Fragment>
      )}
      <Form.Item noStyle style={{ border: '1px solid silver' }}>
        <Button
          onClick={() => onEditClick(item)}
          type="link"
          size="small"
          disabled={item.editing}
        >
          Edit
        </Button>

        {item.editing && (
          <React.Fragment>
            <Button
              onClick={() => onCancelEdit(item)}
              type="link"
              size="small"
              disabled={submitting}
            >
              Cancel
            </Button>

            <Button
              htmlType="submit"
              loading={submitting}
              onClick={() => onSubmit(item, contentCopy)}
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
