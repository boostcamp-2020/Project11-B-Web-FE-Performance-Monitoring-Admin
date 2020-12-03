import React, { useContext } from 'react';
import MainLayout from './layout/MainLayout';
import UserContext from './context';

function App(): React.ReactElement {
  const { user } = useContext(UserContext);
  /**
   * @TODO token이 존재하는 경우
   * 브라우저를 닫고 키면 localstorage에 token이 남아있음. 해당 토큰이 유효한지 검사해야함
   */
  user.nickname = localStorage.getItem('nickname') || '';
  user.token = localStorage.getItem('token') || '';
  return (
    <div className="App">
      <MainLayout />
    </div>
  );
}

export default App;
