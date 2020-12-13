import { Dispatch } from 'redux';
import _ from 'lodash';

import service from '../service';

interface ITutorial {
  step: number;
  isProjectCreated: boolean;
  dsn: string;
}

const SET_STEP = 'tutorial/SET_CRIME' as const;
const SET_IS_PROJECT_CREATED = 'tutorial/SET_IS_PROJECT_CREATED' as const;
const SET_DSN = 'tutorial/SET_DSN' as const;

export const setStep = (step: number) => ({ type: SET_STEP, step });
const setIsProjectCreated = (isCreated: boolean) => ({ type: SET_IS_PROJECT_CREATED, isCreated });
const setDsn = (dsn: string) => ({ type: SET_DSN, dsn });

export const addTestProject = () => async (dispatch: Dispatch) => {
  const res = await service.addProject({
    name: 'Tutorial Project',
    description: 'This is a test project for the tutorial.',
  });
  dispatch(setIsProjectCreated(true));
  dispatch(setDsn(`http://panopticon.gq/api/sdk/${res.data.projectId}`));
};

type TutorialAction =
  | ReturnType<typeof setStep>
  | ReturnType<typeof setIsProjectCreated>
  | ReturnType<typeof setDsn>;

const initTutorial: ITutorial = {
  step: 0,
  isProjectCreated: false,
  dsn: '',
};

function tutorialReducer(state: ITutorial = initTutorial, action: TutorialAction): ITutorial {
  switch (action.type) {
    case SET_STEP: {
      const newTutorial = _.cloneDeep(state);
      newTutorial.step = action.step;
      return newTutorial;
    }
    case SET_IS_PROJECT_CREATED: {
      const newTutorial = _.cloneDeep(state);
      newTutorial.isProjectCreated = action.isCreated;
      return newTutorial;
    }
    case SET_DSN: {
      const newTutorial = _.cloneDeep(state);
      newTutorial.dsn = action.dsn;
      return newTutorial;
    }
    default:
      return state;
  }
}

export default tutorialReducer;
