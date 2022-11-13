import * as React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Select, Form, SelectProps, Input, Button } from 'antd';
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
};

export default function EditCategory() {
  const [form] = Form.useForm();

  const mapCategoriesFromSelected = (values: any) => {
    let categories = allCategories.filter((cat) =>
      form.getFieldValue('selectedCategoryCodes').some((c) => c === cat.code)
    );

    console.log(categories);
    return categories;
  };

  const onFinish = (values: any) => {
    values['categories'] = mapCategoriesFromSelected(values);
    console.log(values);
  };

  const modifiedForm = {
    ...sampleCase,
    selectedCategoryCodes: sampleCase.categories.map((cat) => cat.code),
  };

  const options: SelectProps['options'] = allCategories.map(
    (cat: category) => ({
      label: (
        <span>
          <HomeOutlined /> {cat.description}
        </span>
      ),
      value: cat.code,
    })
  );

  return (
    <React.Fragment>
      <Form form={form} initialValues={modifiedForm} onFinish={onFinish}>
        <Form.Item name="categories" hidden />
        <Form.Item name="logNumber">
          <Input />
        </Form.Item>
        <Form.Item name="selectedCategoryCodes">
          <Select mode="multiple" options={options} />
        </Form.Item>
        <Button htmlType="submit">Save</Button>
      </Form>
    </React.Fragment>
  );
}
