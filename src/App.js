import React from 'react';
import { LineChart, Line } from 'recharts';
import {
  Grid,
  Segment,
} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

const data = [
  { name: 'Page A', uv: 100 },
  { name: 'Page B', uv: 300 },
  { name: 'Page C', uv: 200 },
];

function App() {
  return (
    <Grid celled container columns={2} stackable>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Segment>Content</Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={4}>
          <Segment>Content</Segment>
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment>
            <LineChart width={400} height={400} data={data}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
