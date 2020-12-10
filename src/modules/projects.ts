import { Dispatch } from 'redux';
import _ from 'lodash';
import { IProjectsModule, IProjectCardProps } from '../types';
import service from '../service';

const INITIALIZE_PROJECTS = 'projects/INITIALIZE_PROJECTS' as const;

const initializeProjectsAction = (newProjects: IProjectCardProps[]) => ({
  type: INITIALIZE_PROJECTS,
  projects: newProjects,
});

export const initializeProjects = () => async (dispatch: Dispatch): Promise<void> => {
  const projectRespone = await service.getProjects();
  if (projectRespone.data.projects[0] === undefined) return;
  dispatch(initializeProjectsAction(projectRespone.data.projects));
};

type ProjectsAction = ReturnType<typeof initializeProjectsAction>;

const initialState: IProjectsModule = {
  projects: [],
  selectedProjects: [],
};

function projects(state: IProjectsModule = initialState, action: ProjectsAction): IProjectsModule {
  switch (action.type) {
    case INITIALIZE_PROJECTS: {
      const copiedSelectedProjects = _.cloneDeep(state.selectedProjects);
      const newProjects = {
        projects: action.projects,
        selectedProjects:
          copiedSelectedProjects[0] === undefined ? [action.projects[0]] : copiedSelectedProjects,
      };
      return newProjects;
    }
    default:
      return state;
  }
}

export default projects;
