import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import CodeSnippet from '../../NewProject/CodeSnippet';
import CopyClipboardBox from '../../common/CopyClipboardBox';

const useStyles = makeStyles({
  button: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  dialog: {
    padding: '30px 20px',
  },
});

interface IProps {
  dsn: string;
}

export default function ProjectDNSDialog(props: IProps): React.ReactElement {
  const classes = useStyles();
  const { dsn }: IProps = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        className={classes.button}
      >
        Show DSN
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <Box className={classes.dialog}>
          <CopyClipboardBox textContent={dsn} />
          <CodeSnippet DSN={dsn} />
        </Box>
      </Dialog>
    </Box>
  );
}
