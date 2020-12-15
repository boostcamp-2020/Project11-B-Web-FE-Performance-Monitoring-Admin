import React from 'react';
import Box from '@material-ui/core/Box';
import AccordionComponent from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IGetAlertsResponse } from '../../../types';

interface IProps {
  alert: IGetAlertsResponse;
}

function Accordion(props: IProps): React.ReactElement {
  const { alert } = props;
  return (
    <AccordionComponent>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography>{alert.project.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Box>
            <Box>{alert.period ? 'Period' : 'Issue Count'}</Box>
            <Box>{alert.period ? alert.period : alert.count}</Box>
          </Box>
          <Box>
            {alert.users.map((user) => (
              <Box>
                {user.email} {user.nickname}
              </Box>
            ))}
          </Box>
        </Box>
      </AccordionDetails>
    </AccordionComponent>
  );
}

export default Accordion;
