import _ from 'lodash';

const dataUrl = 'http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv';

/* Sample row

Date: "01.01.2019"
Datasource: "Facebook Ads"
Campaign: "Like Ads"
Clicks: "274"
Impressions: "1979"

*/

export default async function fetchData() {
  const response = await fetch(dataUrl);
  const text = await response.text();
  const [headers, ...rows] = text.split('\n').map(s => s.split(','));
  return rows.map(row => _.zipObject(headers, row));
}
