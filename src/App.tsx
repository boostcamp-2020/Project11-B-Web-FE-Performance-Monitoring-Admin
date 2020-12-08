import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from './layout/MainLayout';
import { loginUser } from './modules/user';

function App(): React.ReactElement {
  const dispatch = useDispatch();
  dispatch(
    loginUser(
      localStorage.getItem('nickname') || undefined,
      localStorage.getItem('token') || undefined,
    ),
  );
  /**
   * @TODO token이 존재하는 경우
   * 브라우저를 닫고 키면 localstorage에 token이 남아있음. 해당 토큰이 유효한지 검사해야함
   */
  return <MainLayout />;
}

export default App;
