import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { Box, Button, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import service from '../../../service';

const useStyles = makeStyles({
  root: {
    height: '60px',
  },
});
interface IProps {
  title: string;
  projectId: string;
}

export default function ProjectDetailDelete(props: IProps): React.ReactElement {
  const { title, projectId }: IProps = props;
  const classes = useStyles();
  const [inputTitle, setInputTitle] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  const startDeleting = () => {
    setShowDelete(true);
  };
  const cancelDeleting = () => {
    setInputTitle('');
    setShowDelete(false);
  };

  const history = useHistory();

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(() => target.value);
  };
  const deleteProject = async () => {
    await service.deleteProject(projectId);
    history.push('/projects');
  };

  return (
    <Box className={classes.root}>
      <form noValidate autoComplete="off">
        <Box display="flex" flexDirection="column" alignItems="start">
          {showDelete ? (
            <Box display="flex" alignItems="flex-end">
              <TextField
                error
                id="standard-error"
                label="Project Name"
                value={inputTitle}
                onChange={onChange}
              />
              {inputTitle === title && (
                <Box ml={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={deleteProject}
                  >
                    Delete
                  </Button>
                </Box>
              )}
              <Box ml={2}>
                <Button variant="contained" color="primary" onClick={cancelDeleting}>
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Box mt={2}>
              <Button color="secondary" size="large" onClick={startDeleting}>
                Delete Project
              </Button>
            </Box>
          )}
        </Box>
      </form>
    </Box>
  );
}
