import React from 'react';
import { DatePicker, DateRangePicker, Space } from 'tdesign-react';
import type { DatePickerProps, DateRangePickerProps } from 'tdesign-react';

export default function YearDatePicker() {
  const handleChange: DatePickerProps['onChange'] = (value) => {
    console.log(value);
  };

  const handleRangeChange: DateRangePickerProps['onChange'] = (value) => {
    console.log(value);
  };

  return (
    <Space direction="vertical">
      <DatePicker mode="month" clearable allowInput onChange={handleChange} />
      <DateRangePicker mode="month" clearable allowInput onChange={handleRangeChange} />
    </Space>
  );
}
