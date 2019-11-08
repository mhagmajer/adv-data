import React from 'react';
import {
  Dropdown,
  Header,
  Segment,
} from 'semantic-ui-react';

const Sidebar = ({
  filters,
  filter,
  setFilter
}) => (
  <>
    {filters.map(({ key, values }) => (
      <Segment key={key}>
        <Header>{key}</Header>
        <Dropdown
          placeholder='State'
          fluid
          multiple
          search
          selection
          onChange={(e, { value }) => setFilter({ ...filter, [key]: value })}
          options={values.map(value => ({ key: value, value, text: value }))}
          value={filter[key]}
        />
      </Segment>
    ))}
  </>
);

export default Sidebar;
