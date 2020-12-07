import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import service from '../service';
import UserContext from '../context';

function InviteProject(): React.ReactElement {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const {
    location: { search },
  } = history;
  const { key } = qs.parse(search, { ignoreQueryPrefix: true });
  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    const token = localStorage.getItem('token');
    if (key && nickname && token) {
      (async () => {
        const encodeKey = encodeURIComponent(key as string);
        await service.acceptInvitation(encodeKey);
        setUser({
          nickname,
          token,
        });
        history.push('/projects');
      })();
    } else {
      history.push(`/`, { key });
    }
  });

  return <></>;
}

export default InviteProject;
