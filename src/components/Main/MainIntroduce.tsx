import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
  title: string;
  list: string[];
  img: string;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    '&:nth-child(even)': {
      flexDirection: 'row-reverse',
    },
  },
  imgContainer: {
    height: '100%',
    borderRadius: '3px',
    boxShadow: '0 0 20px 5px #cfcfcf',
    '& img': {
      width: '100%',
    },
  },
});

function MainIntroduce(props: IProps): React.ReactElement {
  const { title, list, img } = props;
  const classes = useStyles();
  return (
    <Box className={classes.container} py={10}>
      <Box flex="1" p={5} display="flex" justifyContent="center" flexDirection="column">
        <Typography color="primary" variant="h2">
          {title}
        </Typography>
        <Box fontSize="16px">
          <ul>
            {list.map((el) => (
              <li>{el}</li>
            ))}
          </ul>
        </Box>
      </Box>
      <Box flex="1">
        <Box className={classes.imgContainer}>
          <img src={img} alt="description" />
        </Box>
      </Box>
    </Box>
  );
}

export default MainIntroduce;
