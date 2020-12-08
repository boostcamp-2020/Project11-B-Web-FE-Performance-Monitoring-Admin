import { Dispatch } from 'redux';
import { IUserLocalStorage } from '../types';
import service from '../service';

const LOGIN_USER = 'user/LOGIN_USER' as const;
const LOGOUT_USER = 'user/LOGOUT_USER' as const;

export const loginUser = (nickname: string, token: string) => ({
  type: LOGIN_USER,
  nickname,
  token,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const acceptInvitation = (
  encodeKey: string,
  nickname: string,
  token: string,
  history: any,
) => async (dispatch: Dispatch): Promise<void> => {
  await service.acceptInvitation(encodeKey);
  dispatch(loginUser(nickname, token));
  history.push('/projects');
};

type UserAction = ReturnType<typeof loginUser> | ReturnType<typeof logoutUser>;

const initialState = {
  nickname: undefined,
  token: undefined,
};

function crime(state: IUserLocalStorage = initialState, action: UserAction): IUserLocalStorage {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        nickname: action.nickname,
        token: action.token,
      };
    }
    case LOGOUT_USER: {
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
