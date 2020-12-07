import { createContext } from 'react';

interface IUserContext {
  user: {
    nickname?: string;
    token?: string;
  };
  setUser(state: any): void;
}

const UserContext = createContext({} as IUserContext);

export default UserContext;
