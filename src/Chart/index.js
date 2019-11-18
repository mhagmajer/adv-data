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
  model,
  filter,
}) => {
  return (
    <LineChart width={800} height={400} data={model.getRows(filter)}>
      <XAxis dataKey="date" />
      <YAxis yAxisId="clicks">
        <Label angle={-90} position="insideLeft">Clicks</Label>
      </YAxis>
      <YAxis yAxisId="impressions" orientation="right">
        <Label angle={90} position="insideRight">Impressions</Label>
      </YAxis>
      <Tooltip />
      <Legend />
      <Line yAxisId="clicks" type="monotone" dataKey="clicks" stroke="blue" />
      <Line yAxisId="impressions" type="monotone" dataKey="impressions" stroke="green" />
    </LineChart>
  );
}

export default Chart;
