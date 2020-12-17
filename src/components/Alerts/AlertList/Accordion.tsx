import React from 'react';
import Box from '@material-ui/core/Box';
import AccordionComponent from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { IAlert } from '../../../types';

const useStyles = makeStyles({
  container: {
    padding: '4px 16px',
  },
});

interface IProps {
  alert: IAlert;
}

function Accordion(props: IProps): React.ReactElement {
  const { alert } = props;
  const classes = useStyles();
  const getPeriodLabel = (period: string): string => {
    switch (period) {
      case '1d':
        return '1 day';
      case '3d':
        return '3 days';
      case '1w':
        return '1 week';
      default:
        return period;
    }
  };

  const getCountLabel = (count: number): string => {
    if (!alert.count) return '';
    if (alert.count === 1) return `${alert.count} issue`;
    return `${alert.count} issues`;
  };

  return (
    <AccordionComponent className={classes.container}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography variant="h2" color="primary">
          {alert.project.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Box mb={3} py={2}>
            <Box mb={1}>
              <Typography variant="h4" color="primary">
                Setting
              </Typography>
            </Box>
            <Box>
              <Box display="flex">
                <Box mr={2}>
                  <Typography color="primary">Type</Typography>
                </Box>
                <Typography>{alert.period ? 'Period' : 'Count'}</Typography>
              </Box>
              <Box display="flex">
                <Box mr={2}>
                  <Typography color="primary">Value</Typography>
                </Box>
                <Typography>
                  {alert.period ? getPeriodLabel(alert.period) : getCountLabel(alert.count)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box pb={2}>
            <Box mb={1}>
              <Typography color="primary" variant="h4">
                Users
              </Typography>
            </Box>
            {alert.users.map((user) => (
              <Box display="flex" gridGap={10}>
                <Typography>{user.nickname}</Typography>
                <Typography>{user.email}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </AccordionDetails>
    </AccordionComponent>
  );
}

export default Accordion;
