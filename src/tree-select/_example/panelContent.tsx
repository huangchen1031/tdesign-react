import React, { useState } from 'react';
import { TreeSelect, Input, Space } from 'tdesign-react';

import type { TreeSelectProps } from 'tdesign-react';

const options: TreeSelectProps['data'] = [
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      {
        label: '广州市',
        value: 'guangzhou',
      },
      {
        label: '深圳市',
        value: 'shenzhen',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
      },
      {
        label: '苏州市',
        value: 'suzhou',
      },
    ],
  },
];

export default function Example() {
  const [value, setValue] = useState('guangzhou');
  const [filter, setFilter] = useState('');

  return (
    <Space direction="vertical" style={{ width: 300 }}>
      <TreeSelect
        data={options}
        clearable
        placeholder="请选择"
        value={value}
        onChange={(val: string) => setValue(val)}
        filter={(_, option) => {
          if (typeof option.label === 'string') {
            return !filter || option.label.indexOf(filter) > -1;
          }

          return true;
        }}
        panelTopContent={<Input value={filter} onChange={setFilter} />}
      />
    </Space>
  );
}
