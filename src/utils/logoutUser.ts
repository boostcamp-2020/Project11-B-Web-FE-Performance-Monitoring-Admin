const logoutUser = (): void => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  localStorage.removeItem('token');
  localStorage.removeItem('nickname');
  window.location.href = '/';
};
export default logoutUser;
