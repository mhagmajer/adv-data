import React, { useState, useEffect } from 'react';
import {
  Grid,
  Segment,
} from 'semantic-ui-react';

import fetchData from './fetchData';
import Chart from './Chart';
import Sidebar from './Sidebar';

import 'semantic-ui-css/semantic.min.css';

function App() {
  const [data, setData] = useState({});
  const [filter, setFilter] = useState({
    Datasource: ['Facebook Ads'],
    Campaign: ['Like Ads'],
  });

  useEffect(() => {
    (async () => {
      try {
        setData(await fetchData());
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (!data.rows) {
    return null;
  }

  return (
    <Grid celled container columns={2} stackable>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Segment>Content</Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={4}>
          <Sidebar
            filters={data.filters}
            {...{ filter, setFilter }}
          />
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment>
            <Chart
              rows={data.rows}
              {...{ filter }}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
