import React from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from './layout/MainLayout';
import { validateUser } from './modules/user';

function App(): React.ReactElement {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(validateUser(token));
  }
  return <MainLayout />;
}

export default App;
