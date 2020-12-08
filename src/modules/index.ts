import { combineReducers } from 'redux';
import issue from './issue';
import crime from './crime';

const rootReducer = combineReducers({
  issue,
  crime,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
