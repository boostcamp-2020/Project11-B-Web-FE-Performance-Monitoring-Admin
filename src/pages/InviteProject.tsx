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
    if (key && nickname && token) {
      const encodeKey = encodeURIComponent(key as string);
      dispatch(acceptInvitation(encodeKey, nickname, token, history));
    } else {
      history.push(`/`, { key });
    }
  });

  return <></>;
}

export default InviteProject;
