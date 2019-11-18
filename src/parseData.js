import _ from 'lodash';
import { DateTime } from 'luxon';

class DataModel<R> {
  constructor(rows: R[], filterKeys: $Keys<R>[]) {
    this._rows = rows;
    this._filterKeys = filterKeys;
  }

  _rows: R[];
  _filterKeys: $Keys<R>[];

  getRows(filter: { [$Keys<R>]: [string] } = {}): R[] {
    return this._rows.filter(row => Object.keys(filter).every((key) => {
      const filterValues = filter[key];
      return !filterValues.length || filterValues.includes(row[key])
    }));
  }

  getFilters(filter: { [$Keys<R>]: [string] } = {}): { [$Keys<R>]: [string] } {
    const filteredRows = this.getRows(filter);
    return _.fromPairs(this._filterKeys.map(key => [
      key,
      _.uniq(filteredRows.map(r => r[key])),
    ]));
  }
}

type Row = {
  date: Date,
  datasource: string,
  campaign: string,
  clicks: number,
  impressions: number,
};

export default function parseData(json: string): DataModel<Row> {
  const [head, ...tail] = json.split('\n').map(s => s.split(','));
  const rows = tail.map((row) => {
    const obj = _.zipObject(head, row);
    return {
      date: DateTime.fromFormat(obj['Date'], 'dd.MM.yyyy').toFormat('yyyy-MM-dd'),
      datasource: obj['Datasource'],
      campaign: obj['Campaign'],
      clicks: Number(obj['Clicks']),
      impressions: Number(obj['Impressions']),
    }
  });
  return new DataModel(rows, ['datasource', 'campaign']);
}
