import React from 'react';
import { Paper, styled } from '@material-ui/core';

const FullHeightPaper = styled(Paper)({
  height: '100%',
  padding: '10px',
  textAlign: 'center',
});

interface IProps {
  children: React.ReactElement | string;
}

function ChartFrame(props: IProps): React.ReactElement {
  const { children } = props;
  return <FullHeightPaper>{children}</FullHeightPaper>;
}

export default ChartFrame;
