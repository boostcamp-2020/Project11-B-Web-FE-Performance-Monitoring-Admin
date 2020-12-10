import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { initializeVisits } from '../modules/visits';

import { RootState } from '../modules';

function Projects(): React.ReactElement {
  const projectId = '5fd0bbb03eaa461e2c83a0c4';
  const monthlyVisits = useSelector((state: RootState) => state.visits.monthlyVisits);
  const dailyVisits = useSelector((state: RootState) => state.visits.dailyVisits);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeVisits(projectId));
  }, [projectId]);
  return (
    <>
      <Box p={5} display="flex" flexDirection="column">
        {JSON.stringify(monthlyVisits)}
      </Box>
      <Box p={5} display="flex" flexDirection="column">
        {JSON.stringify(dailyVisits)}
      </Box>
    </>
  );
}

export default Projects;
