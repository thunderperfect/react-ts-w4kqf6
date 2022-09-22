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
  isAuthor: boolean;
}
export default function Editor({
  item,
  isAuthor,
  onSubmit,
  submitting,
  onEditClick,
  onCancelEdit,
  value,
}: EditorProps) {
  const [contentCopy, setContentCopy] = React.useState(value);
  return (
    <React.Fragment>
      <Form.Item noStyle>
        {isAuthor && item.editing && (
          <TextArea
            placeholder="Autosize height with minimum and maximum number of lines"
            autoSize={false}
            onChange={(e) => setContentCopy(e.target.value)}
            value={contentCopy}
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

        {isAuthor && item.editing && (
          <React.Fragment>
            <Button
              htmlType="submit"
              loading={!submitting}
              onClick={() => onCancelEdit(item)}
              type="link"
              size="small"
            >
              Cancel
            </Button>

            <Button
              htmlType="submit"
              loading={!submitting}
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
