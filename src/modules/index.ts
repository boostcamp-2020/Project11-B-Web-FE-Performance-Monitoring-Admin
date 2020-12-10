import { combineReducers } from 'redux';
import issue from './issue';
import crime from './crime';
import user from './user';
import visits from './visits';

const rootReducer = combineReducers({
  issue,
  crime,
  user,
  visits,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
