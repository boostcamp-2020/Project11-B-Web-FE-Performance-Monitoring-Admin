import { createContext } from 'react';

const UserContext = createContext({
  user: {
    nickname: '',
    token: '',
  },
});

export default UserContext;
