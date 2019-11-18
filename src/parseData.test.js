import parseData from './parseData';

it('parses data correctly', () => {
  const model = parseData(`\
Date,Datasource,Campaign,Clicks,Impressions
01.01.2019,Facebook Ads,Like Ads,274,1979
01.01.2019,Facebook Ads,Offer Campaigns - Conversions,10245,764627
01.01.2019,Google Adwords,B2B - Leads,7,444`);
  expect(model.getRows()[0]['datasource']).toEqual('Facebook Ads');
  expect(model.getRows({ datasource: 'Google Adwords' })[0]['clicks']).toEqual(7);
  expect(model.getFilters({ datasource: 'Facebook Ads' })).toEqual({
    datasource: ['Facebook Ads'],
    campaign: ['Like Ads', 'Offer Campaigns - Conversions'],
  });
});
