import React, { useState } from 'react';
import MainLayout from './layout/MainLayout';

function App(): React.ReactElement {
  /**
   * @TODO token이 존재하는 경우
   * 브라우저를 닫고 키면 localstorage에 token이 남아있음. 해당 토큰이 유효한지 검사해야함
   */
  return <MainLayout />;
}

export default App;
