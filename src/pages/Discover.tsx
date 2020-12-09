import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ShareCharts from '../components/Discover/ShareCharts';

import ProjectSelector from '../components/Issues/ProjectSelector';
import IssueCountChart from '../components/Discover/IssueCountChart';
import ChartFrame from '../components/Discover/ChartFrame';

import { IProjectCardProps } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '20px',
      flexGrow: 1,
      width: '100%',
      height: '100%',
    },
  }),
);

function Discover(): React.ReactElement {
  const [selectedProjects, setSelectedProjects] = useState<IProjectCardProps[]>([]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ProjectSelector
        selectedProject={selectedProjects}
        setSelectedProject={setSelectedProjects}
      />
      <Grid container spacing={4} className={classes.root}>
        <ChartFrame xs={12}>
          <IssueCountChart selectedProjects={selectedProjects} />
        </ChartFrame>

        {/* <ChartFrame xs={12}> */}
        <ShareCharts selectedProjects={selectedProjects} />
        {/* </ChartFrame> */}
      </Grid>
    </div>
  );
}

export default Discover;
