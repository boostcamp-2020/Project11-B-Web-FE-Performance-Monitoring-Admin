import React from 'react';
import { Box, Grid } from '@material-ui/core';
import ProjectSelector from '../common/ProjectSelector';
import PeriodSelector from '../common/PeriodSelector';

interface IPageProps {
  children?: React.ReactElement | undefined;
  showProjectSelector?: boolean;
  showPeriodSelector?: boolean;
}

function FilterPage(props: IPageProps): React.ReactElement {
  const { children, showProjectSelector, showPeriodSelector } = props;
  return (
    <Box width="100%" p={3}>
      <Grid container spacing={2}>
        {showProjectSelector && (
          <Grid item xs={showPeriodSelector ? 6 : 12}>
            <ProjectSelector />
          </Grid>
        )}

        {showPeriodSelector && (
          <Grid item xs={showProjectSelector ? 6 : 12}>
            <PeriodSelector />
          </Grid>
        )}
      </Grid>
      {children}
    </Box>
  );
}

FilterPage.defaultProps = {
  children: undefined,
  showProjectSelector: true,
  showPeriodSelector: true,
};
export default FilterPage;
