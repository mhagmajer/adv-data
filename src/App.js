import React, { useState, useEffect } from 'react';
import {
  Dimmer,
  Grid,
  Header,
  Icon,
  Loader,
  Message,
  Segment,
} from 'semantic-ui-react';
import { timeout } from 'promise-more';

import fetchData from './fetchData';
import Chart from './Chart';
import Sidebar from './Sidebar';

import 'semantic-ui-css/semantic.min.css';

function App() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [filter, setFilter] = useState({
    Datasource: ['Facebook Ads'],
    Campaign: ['Like Ads'],
  });

  useEffect(() => {
    (async () => {
      try {
        setData(await timeout(fetchData(), 5000));
      } catch (e) {
        setError(e);
        console.error(e);
      }
    })();
  }, []);

  return (
    <Grid celled container columns={2} stackable>
      <Dimmer active={!data && !error} inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      <Dimmer active={!!error}>
        <Icon name="bug" size="big" color="red" />
        <Message>{String(error)}</Message>
      </Dimmer>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Header as="h2">Sample data explorer</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={4}>
          {data && (
            <Sidebar
              filters={data.filters}
              {...{ filter, setFilter }}
            />
          )}
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment>
            {data && (
              <Chart
                rows={data.rows}
                {...{ filter }}
              />
            )}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
