import axios from '../utils/apiAxios';
import issueService from './issueService';
import statsService from './statsService';
import projectsService from './projectsService';
import projectService from './projectService';
import userService from './userService';

export default (() => {
  return {
    ...issueService(axios),
    ...statsService(axios),
    ...projectsService(axios),
    ...userService(axios),
    ...projectService(axios),
  };
})();
