import axios from '../utils/apiAxios';
import issueService from './issueService';
import statsService from './statsService';
import projectsService from './projectsService';
import userService from './userService';
import visitsService from './visitsService';
import analysisService from './analysisService';
import alertService from './alertService';

export default (() => {
  return {
    ...issueService(axios),
    ...statsService(axios),
    ...projectsService(axios),
    ...userService(axios),
    ...visitsService(axios),
    ...analysisService(axios),
    ...alertService(axios),
  };
})();
