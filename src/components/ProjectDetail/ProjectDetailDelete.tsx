import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import service from '../../service';

interface IProps {
  title: string;
  projectId: string;
}

export default function ProjectDetailDelete(props: IProps): React.ReactElement {
  const { title, projectId }: IProps = props;
  const [inputTitle, setInputTitle] = useState('');

  const history = useHistory();

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(() => target.value);
  };
  const deleteProject = async () => {
    await service.deleteProject(projectId);
    history.push('/projects');
  };

  return (
    <form noValidate autoComplete="off">
      <Box display="flex" mt={10} alignItems="flex-end">
        <TextField
          error
          id="standard-error"
          label="Project Name"
          defaultValue="Hello World"
          value={inputTitle}
          onChange={onChange}
        />
        {inputTitle === title && (
          <Box ml={5}>
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
      </Box>
    </form>
  );
}
