import axios from '../utils/apiAxios';
import issueService from './issueService';

export default (() => {
  return {
    ...issueService(axios),
  };
})();
