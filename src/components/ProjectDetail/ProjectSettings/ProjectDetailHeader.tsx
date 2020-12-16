import React, { useState } from 'react';
import { Box, Typography, Button, TextField, styled } from '@material-ui/core';

const HeightBox = styled(Box)({
  height: '55px',
});

const Description = styled(Box)({
  fontSize: '18px',
  margin: '10px 0',
});
interface IProps {
  title: string;
  desc: string;
  isOwner: boolean;
  setProjectName: (name: string) => void;
}

function ProjectHeader(props: IProps): React.ReactElement {
  const { title, desc, isOwner, setProjectName } = props;
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
    <>
      <HeightBox display="flex" flexDirection="row" alignItems="center" height="90">
        {isEditing ? (
          <>
            <TextField
              id="standard-basic"
              value={titleInput}
              onChange={titleInputChange}
              inputProps={{ style: { fontSize: 30, fontWeight: 'bold' } }}
            />
            <Box display="flex">
              <Box ml={2}>
                <Button variant="outlined" color="primary" size="medium" onClick={changeTitle}>
                  Submit
                </Button>
              </Box>
              <Box ml={2}>
                <Button variant="outlined" color="secondary" size="medium" onClick={endEdit}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <Typography variant="h1">{title}</Typography>
            </Box>
            {isOwner && (
              <Box ml={5}>
                <Button color="primary" size="small" onClick={() => startEdit(title)}>
                  Edit
                </Button>
              </Box>
            )}
          </>
        )}
      </HeightBox>
      <Description>{desc}</Description>
    </>
  );
}

export default ProjectHeader;
