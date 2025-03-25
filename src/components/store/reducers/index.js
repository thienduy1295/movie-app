import { combineReducers } from 'redux';
import infoMoviesReducer from './infoMoviesReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  infoMovies: infoMoviesReducer,
  auth: authReducer,
});

export default rootReducer;
