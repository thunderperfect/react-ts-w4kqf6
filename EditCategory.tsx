import * as React from 'react';

import { Select, Form, SelectProps } from 'antd';
const { Option } = Select;

export interface Case {
  logNumber: string;
  categories: any[];
  selectedCategoryCodes?: string[];
}

interface category {
  code: string;
  description: string;
}

const allCategories: category[] = [
  { code: 'abc', description: 'test 1' },
  { code: 'def', description: 'test 2' },
  { code: 'ghi', description: 'test 3' },
  { code: 'jkl', description: 'test 4' },
];

const sampleCase: Case = {
  logNumber: 'EE-1234-12345',
  categories: [
    { code: 'abc', description: 'test 1' },
    { code: 'def', description: 'test 2' },
  ],
  selectedCategoryCodes: ['abc'],
};

export default function EditCategory() {
  const [form] = Form.useForm();

  const options: SelectProps['options'] = allCategories.map(
    (cat: category) => ({
      label: cat.description,
      value: cat.code,
    })
  );

  return (
    <React.Fragment>
      <Form form={form} initialValues={sampleCase}>
        <Form.Item name="selectedCategoryCodes">
          <Select mode="multiple" options={options} />
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}
