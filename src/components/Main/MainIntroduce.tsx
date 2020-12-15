import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import Image from 'material-ui-image';

interface IProps {
  title: string;
  list: string[];
  img: string;
}

const useStyles = makeStyles({
  title: {
    margin: '10px 10px',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    '&:nth-child(even)': {
      flexDirection: 'row-reverse',
    },
  },
  imgContainer: {
    border: 0,
    borderRadius: '10px',
    boxShadow: '0 0 20px 5px #cfcfcf',

    width: '100%',
  },
});

function MainIntroduce(props: IProps): React.ReactElement {
  const { title, list, img } = props;
  const classes = useStyles();
  return (
    <Box className={classes.container} py={10}>
      <Box flex="1" p={5} display="flex" justifyContent="flex-start" flexDirection="column">
        <Typography color="primary" variant="h2" className={classes.title}>
          {title}
        </Typography>
        <Box fontSize="16px">
          {list.map((el) => (
            <Box display="flex" alignItems="center">
              <Box m={1}>
                <CheckIcon />
              </Box>
              {el}
            </Box>
          ))}
        </Box>
      </Box>
      <Box flex="1">
        <Image
          aspectRatio={16 / 9}
          disableSpinner
          className={classes.imgContainer}
          src={img}
          alt="description"
        />
      </Box>
    </Box>
  );
}

export default MainIntroduce;
