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

import parseData from './parseData';
import Chart from './Chart';
import Sidebar from './Sidebar';

import 'semantic-ui-css/semantic.min.css';

const dataUrl = '//adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv';

function App() {
  const [model, setModel] = useState();
  const [error, setError] = useState();
  const [filter, setFilter] = useState({
    datasource: ['Facebook Ads'],
    campaign: ['Like Ads'],
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await timeout(fetch(dataUrl), 5000);
        const text = await response.text();
        setModel(parseData(text));
      } catch (e) {
        setError(e);
        console.error(e);
      }
    })();
  }, []);

  return (
    <Grid celled container columns={2} stackable>
      <Dimmer active={!model && !error} inverted>
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
          {model && (
            <Sidebar
              {...{ model, filter, setFilter }}
            />
          )}
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment>
            {model && (
              <Chart
                {...{ model, filter }}
              />
            )}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
