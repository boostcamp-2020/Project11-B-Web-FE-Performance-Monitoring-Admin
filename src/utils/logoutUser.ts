const logoutUser = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('nickname');
  window.history.pushState(null, 'home', '/');
};
export default logoutUser;
