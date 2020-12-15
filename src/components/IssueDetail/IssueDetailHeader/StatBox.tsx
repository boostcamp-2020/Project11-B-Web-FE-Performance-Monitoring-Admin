import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

const useStyle = makeStyles({
  root: {
    borderRadius: '10px',
    padding: '6px 10px',
  },
});
interface IStatBoxProps {
  name: string;
  color?: string;
  count: number;
}
function StatBox(props: IStatBoxProps): React.ReactElement {
  const styles = useStyle();
  const { name, color, count } = props;
  return (
    <Box className={styles.root} color={color || 'text.secondary'}>
      <Box textAlign="center">
        <Typography variant="caption" color="textSecondary">
          {name}
        </Typography>
      </Box>

      <Box textAlign="right">
        <Typography variant="h2" color="primary">
          {count}
        </Typography>
      </Box>
    </Box>
  );
}
StatBox.defaultProps = {
  color: 'primary',
};

export default StatBox;
