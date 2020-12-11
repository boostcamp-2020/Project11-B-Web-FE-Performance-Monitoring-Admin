import React from 'react';
import { FormControl, InputLabel, Grid } from '@material-ui/core';

import { IProjectCardProps } from '../../../types';

import ProjectSelector from '../../Issues/ProjectSelector';
import PeriodSelector from './PeriodSelector';
import Filters from './Filters';

interface IProps {
  selectedProjects: IProjectCardProps[];
  setSelectedProjects: React.Dispatch<React.SetStateAction<IProjectCardProps[]>>;
  period: string;
  setPeriod: (period: string) => void;
  filterQuery: Record<string, string[] | undefined>;
  setFilterQuery: (query: Record<string, string[] | undefined>) => void;
}

function DiscoverHeader(props: IProps): React.ReactElement {
  const {
    selectedProjects,
    setSelectedProjects,
    period,
    setPeriod,
    filterQuery,
    setFilterQuery,
  } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <ProjectSelector
          selectedProject={selectedProjects}
          setSelectedProject={setSelectedProjects}
        />
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>SELECTED PERIOD</InputLabel>
          <PeriodSelector period={period} setPeriod={setPeriod} />
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <Filters filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
      </Grid>
    </Grid>
  );
}

export default DiscoverHeader;
