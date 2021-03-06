import React from 'react';
import {
  Dropdown,
  Header,
  Segment,
} from 'semantic-ui-react';

const Sidebar = ({
  model,
  filter,
  setFilter
}) => (
  <>
    {Object.entries(model.getFilters(filter)).map(([key, values]) => (
      <Segment key={key}>
        <Header as="h5">{key}</Header>
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
