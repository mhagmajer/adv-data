import React, { useState, useEffect } from 'react';
import { LineChart, Line } from 'recharts';
import {
  Grid,
  Segment,
} from 'semantic-ui-react';
import fetchData from './fetchData';

import 'semantic-ui-css/semantic.min.css';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        setData(await fetchData());
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

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
            <LineChart width={400} height={400} data={data.slice(0, 10)}>
              <Line type="monotone" dataKey="Clicks" stroke="#8884d8" />
            </LineChart>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
