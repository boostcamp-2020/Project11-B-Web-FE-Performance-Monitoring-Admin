import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, Select, Chip, MenuItem } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { initializeProjects, setSelectedProjectsIdsAction } from '../../modules/projects';
import { RootState } from '../../modules';

const useStyles = makeStyles(() =>
  createStyles({
    root: { width: '100%' },
    formControl: {
      minWidth: 120,
    },
    chips: { display: 'flex', flexWrap: 'wrap' },
    chip: {
      margin: 1,
    },
  }),
);

function ProjectSelector(): React.ReactElement {
  const classes = useStyles();

  const projects = useSelector((state: RootState) => state.projects.projects);
  const selectedProjects = useSelector((state: RootState) => state.projects.selectedProjectsIds);

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newSelectedProjectsIds = event.target.value as string[];
    dispatch(setSelectedProjectsIdsAction(newSelectedProjectsIds));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeProjects());
  }, []);

  return (
    <FormControl fullWidth className={classes.formControl}>
      <InputLabel>SELECTED PROJECT</InputLabel>
      <Select
        placeholder="SELECTED PROJECT"
        multiple
        value={selectedProjects}
        onChange={handleSelectChange}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {(selected as string[]).map((value) => (
              <Chip
                color="primary"
                key={value}
                label={projects.find((project) => project._id === value)?.name}
                className={classes.chip}
              />
            ))}
          </div>
        )}
      >
        {projects.map((project) => (
          <MenuItem key={project._id} value={project._id}>
            {project.name} : {`[${project._id}]`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ProjectSelector;
