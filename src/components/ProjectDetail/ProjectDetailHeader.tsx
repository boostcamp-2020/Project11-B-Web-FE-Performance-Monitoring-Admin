import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@material-ui/core';

interface IProps {
  title: string;
  setProjectName: (name: string) => void;
}

function ProjectHeader(props: IProps): React.ReactElement {
  // const { title, startEdit, changeTitle, titleInputChange } = props;
  const { title, setProjectName } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [titleInput, setTitleInput] = useState('');

  const startEdit = (name: string) => {
    setTitleInput(() => name);
    setIsEditing(true);
  };
  const endEdit = () => {
    setTitleInput(() => '');
    setIsEditing(false);
  };
  const changeTitle = async () => {
    await setProjectName(titleInput);
    endEdit();
  };
  const titleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(() => target.value);
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      {isEditing ? (
        <>
          <TextField
            id="standard-basic"
            value={titleInput}
            onChange={titleInputChange}
            inputProps={{ style: { fontSize: 30, fontWeight: 'bold' } }}
          />
          <Box ml={5}>
            <Button variant="outlined" color="primary" size="small" onClick={changeTitle}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" size="small" onClick={endEdit}>
              Cancel
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Typography variant="h1">{title}</Typography>
          </Box>
          <Box ml={5}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => startEdit(title)}
            >
              Edit
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default ProjectHeader;
