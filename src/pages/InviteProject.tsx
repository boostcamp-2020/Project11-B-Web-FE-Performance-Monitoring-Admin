import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import UserContext from '../context';

function InviteProject() {
  const history = useHistory();
  const {
    location: { search },
  } = history;
  const { key } = qs.parse(search, { ignoreQueryPrefix: true });
  useEffect(() => {
    (async () => {
      const nickname = localStorage.getItem('nickname');
      const token = localStorage.getItem('token');
      console.log(key, nickname, token);
      if (key && nickname && token) {
        const res = await fetch(`http://localhost:4000/api/accept?key=${key}`, {
          method: 'GET',
          headers: { jwt: token },
        });
        console.log(res);
      } else {
        history.push(`/`, { key });
      }
    })();
  });

  return <></>;
}

export default InviteProject;
