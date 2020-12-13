import { Dispatch } from 'redux';
import _ from 'lodash';

import service from '../service';

interface ITutorial {
  step: number;
  isProjectCreated: boolean;
  dsn: string;
  text: any;
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
  text: {
    korean: {
      labels: {
        createProject: '튜토리얼을 위한 테스트 프로젝트를 생성해보세요',
        copyDsn: '버튼을 클릭해서 새 프로젝트의 DSN을 복사해보세요',
        goCodepen: 'Codepen에서 테스트 프로젝트에 에러를 보내보세요',
        checkResults: 'Issues & Discover 페이지에서 수집된 에러 데이터를 확인해보세요',
      },
      createProject: {
        welcome: '안녕하세요, Panopticon의 튜토리얼에 오신 것을 환영합니다!',
        description:
          '당신의 App에서 발생한 에러와 퍼포먼스 데이터는 Panopticon에서 프로젝트 단위로 관리됩니다. 아래 버튼을 클릭해서 테스트 프로젝트를 만들어 보세요!',
        congrats:
          '축하합니다! 금방 프로젝트를 생성하셨어요. Project 페이지로 이동해서 새로운 프로젝트가 잘 생성되었는지 확인할 수 있습니다.',
        checkResult:
          '아래의 버튼을 눌러서 Project 탭으로 이동해 보세요! 확인하신 이후에 다시 사이드바에서 Tutorial을 클릭해서 돌아올 수 있습니다.',
        goToProjects: '프로젝트 페이지로 가기',
      },
    },
  },
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
