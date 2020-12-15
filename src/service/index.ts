import axios from '../utils/apiAxios';
import issueService from './issueService';
import statsService from './statsService';
import projectsService from './projectsService';
import projectService from './projectService';
import userService from './userService';
import visitsService from './visitsService';
import analysisService from './analysisService';

export default (() => {
  return {
    ...issueService(axios),
    ...statsService(axios),
    ...projectsService(axios),
    ...userService(axios),
    ...projectService(axios),
    ...visitsService(axios),
    ...analysisService(axios),
  };
})();
