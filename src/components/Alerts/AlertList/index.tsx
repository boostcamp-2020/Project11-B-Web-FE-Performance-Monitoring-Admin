import React from 'react';
import Box from '@material-ui/core/Box';
import Accordion from './Accordion';
import { IAlert } from '../../../types';

interface IProps {
  alerts: IAlert[] | undefined;
}

function AlertList(props: IProps): React.ReactElement {
  const { alerts } = props;

  return (
    <Box flex="1">
      {alerts && alerts.map((alert) => <Accordion key={alert._id} alert={alert} />)}
    </Box>
  );
}

export default AlertList;
