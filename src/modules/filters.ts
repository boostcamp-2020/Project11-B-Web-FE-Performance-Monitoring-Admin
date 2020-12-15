import { Dispatch } from 'redux';
import _ from 'lodash';
import { IProjectsModule, IProjectCardProps } from '../types';
import service from '../service';

const INITIALIZE_PROJECTS = 'projects/INITIALIZE_PROJECTS' as const;
const SET_SELECTED_PROJECTS_IDS = 'projects/SET_SELECTED_PROJECTS_IDS' as const;
const SET_SELECTED_PERIOD = 'projects/SET_SELECTED_PERIOD' as const;

const initializeProjectsAction = (newProjects: IProjectCardProps[]) => ({
  type: INITIALIZE_PROJECTS,
  projects: newProjects,
});

export const initializeProjects = () => async (dispatch: Dispatch): Promise<void> => {
  const projectRespone = await service.getProjects();
  if (projectRespone.data.projects[0] === undefined) return;
  dispatch(initializeProjectsAction(projectRespone.data.projects));
};

export const setSelectedProjectsIdsAction = (newSelectedProjectsIds: string[]) => ({
  type: SET_SELECTED_PROJECTS_IDS,
  selectedProjectsIds: newSelectedProjectsIds,
});

export const setSelectedPeriodAction = (newSelectedPeriod: string) => ({
  type: SET_SELECTED_PERIOD,
  selectedPeriod: newSelectedPeriod,
});

type ProjectsAction =
  | ReturnType<typeof initializeProjectsAction>
  | ReturnType<typeof setSelectedProjectsIdsAction>
  | ReturnType<typeof setSelectedPeriodAction>;

const initialState: IProjectsModule = {
  projects: [],
  selectedProjectsIds: [],
  selectedPeriod: '1w',
};

function projects(state: IProjectsModule = initialState, action: ProjectsAction): IProjectsModule {
  switch (action.type) {
    case INITIALIZE_PROJECTS: {
      const copiedProjects = _.cloneDeep(state);
      copiedProjects.projects = action.projects;
      copiedProjects.selectedProjectsIds =
        state.selectedProjectsIds[0] === undefined
          ? [action.projects[0]._id]
          : state.selectedProjectsIds;

      return copiedProjects;
    }
    case SET_SELECTED_PROJECTS_IDS: {
      const copiedProjects = _.cloneDeep(state);
      copiedProjects.selectedProjectsIds = action.selectedProjectsIds;
      return copiedProjects;
    }

    case SET_SELECTED_PERIOD: {
      const copiedProjects = _.cloneDeep(state);
      copiedProjects.selectedPeriod = action.selectedPeriod;
      return copiedProjects;
    }
    default:
      return state;
  }
}

export default projects;
