import _ from 'lodash';

const dataUrl = '//adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv';

export default async function fetchData(): {
  rows: [{
    Date: string,
    Datasource: string,
    Campaign: string,
    Clicks: string,
    Impressions: string,
  }],
  filters: [{
    key: string,
    values: [string],
  }],
} {
  const response = await fetch(dataUrl);
  const text = await response.text();
  const [head, ...tail] = text.split('\n').map(s => s.split(','));
  const rows = tail.map(row => _.zipObject(head, row));
  const filters = ['Datasource', 'Campaign'].map((key) => ({
    key,
    values: _.uniq(rows.map(r => r[key])),
  }));
  return { rows, filters };
}
