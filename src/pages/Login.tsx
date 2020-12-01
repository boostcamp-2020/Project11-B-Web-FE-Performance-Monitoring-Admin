import React from 'react';

const isDev: boolean = process.env.NODE_ENV === 'development';
// const oauthURL: string = isDev ? 'http://panopticon-dev.gq/api/auth/github' : '/api/auth/github';
const oauthURL: string = isDev ? 'http://localhost:3000/api/auth/github' : '/api/auth/github';

const Login = (): React.ReactElement => {
  window.history.replaceState(null, '', '/login');
  return (
    <div>
      <h2>Panopticon</h2>
      <a href={oauthURL}>구글 로그인하기</a>
    </div>
  );
};
export default Login;
