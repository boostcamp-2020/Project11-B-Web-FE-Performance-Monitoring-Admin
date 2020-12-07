import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

const useStyle = makeStyles({
  root: {
    borderRadius: '10px',
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
    <Box className={styles.root} bgcolor={color}>
      <Box>
        <Typography variant="h3" color="textPrimary">
          {name}
        </Typography>
      </Box>

      <Box>
        <Typography variant="h2" color="textPrimary">
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
