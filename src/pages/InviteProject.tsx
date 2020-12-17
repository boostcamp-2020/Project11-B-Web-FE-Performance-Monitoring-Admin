import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { useDispatch } from 'react-redux';
import { acceptInvitation } from '../modules/user';

function InviteProject(): React.ReactElement {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    location: { search },
  } = history;
  const { key } = qs.parse(search, { ignoreQueryPrefix: true });
  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (key && nickname && token && email) {
      const encodeKey = encodeURIComponent(key as string);
      dispatch(acceptInvitation(encodeKey, nickname, token, email, history));
      localStorage.removeItem('nickname');
      localStorage.removeItem('email');
    } else {
      history.push(`/`, { key });
    }
  });

  return <></>;
}

export default InviteProject;
