import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, Input, Chip, MenuItem } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import service from '../../service';
import { IProjectCardProps } from '../../types';

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

export interface IProjectSelectorProps {
  selectedProject: IProjectCardProps[];
  setSelectedProject: React.Dispatch<React.SetStateAction<IProjectCardProps[]>>;
}
function ProjectSelector(props: IProjectSelectorProps): React.ReactElement {
  const classes = useStyles();
  const { selectedProject, setSelectedProject } = props;
  const [projects, setProjects] = useState<IProjectCardProps[]>([]);
  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedProject(event.target.value as IProjectCardProps[]);
  };
  useEffect(() => {
    (async () => {
      const projectRespone = await service.getProjects();
      if (projectRespone.data.projects[0] === undefined) return;
      setProjects(projectRespone.data.projects);
      if (!selectedProject[0]) {
        setSelectedProject([projectRespone.data.projects[0]]);
      }
    })();
  }, []);
  return (
    <FormControl fullWidth className={classes.formControl}>
      <InputLabel>SELECTED PROJECT</InputLabel>
      <Select
        placeholder="SELECTED PROJECT"
        multiple
        value={selectedProject}
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
            {(selected as IProjectCardProps[]).map((value) => (
              <Chip color="primary" key={value._id} label={value.name} className={classes.chip} />
            ))}
          </div>
        )}
      >
        {projects.map((project) => (
          <MenuItem key={project._id} value={project as any}>
            {project.name} : {`[${project._id}]`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ProjectSelector;
