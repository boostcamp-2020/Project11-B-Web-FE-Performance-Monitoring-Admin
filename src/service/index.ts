import axios from '../utils/apiAxios';
import issueService from './issueService';
import statsService from './statsService';

export default (() => {
  return {
    ...issueService(axios),
    ...statsService(axios),
  };
})();
