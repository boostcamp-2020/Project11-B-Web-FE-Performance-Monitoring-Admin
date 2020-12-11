import { combineReducers } from 'redux';
import projects from './projects';
import issue from './issue';
import crime from './crime';
import user from './user';

const rootReducer = combineReducers({
  projects,
  issue,
  crime,
  user,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
