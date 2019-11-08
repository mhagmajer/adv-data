import React from 'react';
import { LineChart, Line } from 'recharts';

const Chart = ({
  filter,
  rows,
}) => {
  const filteredRows = rows.filter(row => Object.keys(filter).every((key) => {
    const filterValues = filter[key];
    return !filterValues.length || filterValues.includes(row[key])
  }));

  return (
    <LineChart width={400} height={400} data={filteredRows}>
      <Line type="monotone" dataKey="Clicks" stroke="#8884d8" />
    </LineChart>
  );
}

export default Chart;
