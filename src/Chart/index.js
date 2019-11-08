import React from 'react';
import {
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Chart = ({
  filter,
  rows,
}) => {
  const filteredRows = rows.filter(row => Object.keys(filter).every((key) => {
    const filterValues = filter[key];
    return !filterValues.length || filterValues.includes(row[key])
  }));

  return (
    <LineChart width={800} height={400} data={filteredRows}>
      <XAxis dataKey="Date" />
      <YAxis yAxisId="clicks">
        <Label angle={-90} position="insideLeft">Clicks</Label>
      </YAxis>
      <YAxis yAxisId="impressions" orientation="right">
        <Label angle={90} position="insideRight">Impressions</Label>
      </YAxis>
      <Tooltip />
      <Legend />
      <Line yAxisId="clicks" type="monotone" dataKey="Clicks" stroke="blue" />
      <Line yAxisId="impressions" type="monotone" dataKey="Impressions" stroke="green" />
    </LineChart>
  );
}

export default Chart;
