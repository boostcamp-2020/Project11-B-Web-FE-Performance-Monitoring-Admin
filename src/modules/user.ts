import { Dispatch } from 'redux';
import { IUserLocalStorage } from '../types';
import service from '../service';

const SET_USER = 'user/SET_USER' as const;
const UNSET_USER = 'user/UNSET_USER' as const;

export const setUser = (nickname: string, token: string) => ({
  type: SET_USER,
  nickname,
  token,
});

export const unsetUser = () => ({
  type: UNSET_USER,
});

export const acceptInvitation = (
  encodeKey: string,
  nickname: string,
  token: string,
  history: any,
) => async (dispatch: Dispatch): Promise<void> => {
  await service.acceptInvitation(encodeKey);
  dispatch(setUser(nickname, token));
  history.push('/projects');
};

type UserAction = ReturnType<typeof setUser> | ReturnType<typeof unsetUser>;

const initialState = {
  nickname: undefined,
  token: undefined,
};

function crime(state: IUserLocalStorage = initialState, action: UserAction): IUserLocalStorage {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        nickname: action.nickname,
        token: action.token,
      };
    }
    case UNSET_USER: {
      return {
        ...state,
        nickname: undefined,
        token: undefined,
      };
    }
    default:
      return state;
  }
}

export default crime;
