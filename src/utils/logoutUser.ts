const logoutUser = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('nickname');
  window.location.href = '/';
};
export default logoutUser;
