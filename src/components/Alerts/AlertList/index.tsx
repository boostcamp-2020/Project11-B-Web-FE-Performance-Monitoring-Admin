import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Accordion from './Accordion';
import service from '../../../service';
import { IGetAlertsResponse } from '../../../types';

interface IProps {
  projects: string[];
}

function AlertList(props: IProps): React.ReactElement {
  const { projects } = props;
  const [alerts, setAlerts] = useState<IGetAlertsResponse[] | undefined>(undefined);

  useEffect(() => {
    const fetchAlerts = async () => {
      const { data } = await service.getAlerts(projects);
      setAlerts(data);
    };
    fetchAlerts();
  }, [projects]);

  return <Box flex="1">{alerts && alerts.map((alert) => <Accordion alert={alert} />)}</Box>;
}

export default AlertList;
