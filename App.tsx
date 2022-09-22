import * as React from 'react';
import './style.css';

import { Comment, Tooltip } from 'antd';

export default function App() {
  return (
    <div style={{padding: '20px'}}>
      <Comment
        author={<a>Han Solo</a>}
        content={
          <p>
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently.
          </p>
        }
        datetime={
          <Tooltip title="2016-11-22 11:22:33">
            <span>8 hours ago</span>
          </Tooltip>
        }
      />
    </div>
  );
}
