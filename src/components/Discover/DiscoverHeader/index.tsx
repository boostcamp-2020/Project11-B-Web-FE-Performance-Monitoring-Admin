import React from 'react';
import { Box, FormControl, InputLabel } from '@material-ui/core';

import { IProjectCardProps } from '../../../types';

import ProjectSelector from '../../Issues/ProjectSelector';
import PeriodSelector from './PeriodSelector';

interface IProps {
  selectedProjects: IProjectCardProps[];
  setSelectedProjects: React.Dispatch<React.SetStateAction<IProjectCardProps[]>>;
  period: string;
  setPeriod: (period: string) => void;
}

function DiscoverHeader(props: IProps): React.ReactElement {
  const { selectedProjects, setSelectedProjects, period, setPeriod } = props;

  return (
    <Box display="flex" flexDirection="row" gridGap={20}>
      <ProjectSelector
        selectedProject={selectedProjects}
        setSelectedProject={setSelectedProjects}
      />
      <FormControl fullWidth>
        <InputLabel>SELECTED PERIOD</InputLabel>
        <PeriodSelector period={period} setPeriod={setPeriod} />
      </FormControl>
    </Box>
  );
}

export default DiscoverHeader;
