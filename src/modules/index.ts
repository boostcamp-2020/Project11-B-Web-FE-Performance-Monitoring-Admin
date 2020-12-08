import { combineReducers } from 'redux';
import issue from './issue';

const rootReducer = combineReducers({
  issue,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
