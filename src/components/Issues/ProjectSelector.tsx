import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, FormControl, InputLabel, Select, Input, Chip, MenuItem } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import service from '../../service';
import { IProjectCardProps } from '../../types';
import { initializeProjects, setSelectedProjectsIdsAction } from '../../modules/projects';
import { RootState } from '../../modules';

const useStyles = makeStyles(() =>
  createStyles({
    root: { width: '100%', margin: '16px 0px' },
    formControl: {
      minWidth: 120,
      maxWidth: '33%',
    },
    select: { height: '80px' },
    chips: { height: '100%', display: 'flex', flexWrap: 'wrap' },
    chip: {
      height: '40px',
      margin: 2,
    },
  }),
);

export interface IProjectSelectorProps {
  selectedProject: IProjectCardProps[];
  setSelectedProject: React.Dispatch<React.SetStateAction<IProjectCardProps[]>>;
}
function ProjectSelector(props: IProjectSelectorProps): React.ReactElement {
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
    <Box className={classes.root}>
      <FormControl variant="outlined" size="medium" fullWidth className={classes.formControl}>
        <InputLabel>SELECTED PROJECT</InputLabel>
        <Select
          className={classes.select}
          placeholder="SELECTED PROJECT"
          variant="filled"
          multiple
          value={selectedProjects}
          onChange={handleSelectChange}
          input={<Input />}
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
            <MenuItem className={classes.select} key={project._id} value={project._id}>
              {project.name} : {`[${project._id}]`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default ProjectSelector;
