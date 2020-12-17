import { combineReducers } from 'redux';
import projects from './filters';
import issue from './issue';
import crime from './crime';
import user from './user';
import tutorial from './tutorial';

const rootReducer = combineReducers({
  projects,
  issue,
  crime,
  user,
  tutorial,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
