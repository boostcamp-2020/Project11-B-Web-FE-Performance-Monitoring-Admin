import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IUserLocalStorage } from '../types';
import service from '../service';

const LOGIN_USER = 'user/LOGIN_USER' as const;
const LOGOUT_USER = 'user/LOGOUT_USER' as const;
const UPDATE_EMAIL = 'user/UPDATE_EMAIL' as const;

export const updateEmail = (email: string): any => ({
  type: UPDATE_EMAIL,
  email,
});

export const loginUser = (
  token: string | undefined,
  email: string | undefined,
  nickname: string | undefined,
): any => ({
  type: LOGIN_USER,
  token,
  email,
  nickname,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const validateUser = (token: string | undefined) => async (
  dispatch: Dispatch,
): Promise<void> => {
  const res = await service.getUser();
  if (res) {
    const { email, nickname } = res.data;
    dispatch(loginUser(token, email, nickname));
  }
};

export const acceptInvitation = (encodeKey: string, token: string, history: any) => async (
  dispatch: Dispatch,
): Promise<void> => {
  const { data } = await service.getUser();
  await service.acceptInvitation(encodeKey);
  dispatch(loginUser(token, data.email, data.nickname));
  history.push('/projects');
};

export const thunkUpdateEmail = (
  email: string,
): ThunkAction<void, IUserLocalStorage, unknown, Action<string>> => async (
  dispatch,
  getState,
): Promise<void> => {
  await service.updateEmail(email);
  dispatch(updateEmail(email));
};

type UserAction =
  | ReturnType<typeof loginUser>
  | ReturnType<typeof logoutUser>
  | ReturnType<typeof updateEmail>;

const initialState = {
  nickname: undefined,
  token: undefined,
  email: undefined,
};

function crime(state: IUserLocalStorage = initialState, action: UserAction): IUserLocalStorage {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        nickname: action.nickname,
        token: action.token,
        email: action.email,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        nickname: undefined,
        token: undefined,
      };
    }
    case UPDATE_EMAIL: {
      return {
        ...state,
        email: action.email,
      };
    }
    default:
      return state;
  }
}

export default crime;
