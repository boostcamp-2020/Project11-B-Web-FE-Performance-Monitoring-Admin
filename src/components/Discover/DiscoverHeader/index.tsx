import React from 'react';

import Filters from './Filters';

interface IProps {
  filterQuery: Record<string, string[] | undefined>;
  setFilterQuery: (query: Record<string, string[] | undefined>) => void;
}

function DiscoverHeader(props: IProps): React.ReactElement {
  const { filterQuery, setFilterQuery } = props;
  return <Filters filterQuery={filterQuery} setFilterQuery={setFilterQuery} />;
}

export default DiscoverHeader;
