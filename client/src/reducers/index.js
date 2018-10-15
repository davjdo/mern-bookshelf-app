import { combineReducers } from 'redux';
import booksReducer from './books_reducer';
import userReducer from './user_reducer';

const rootReducer = combineReducers({
  books: booksReducer,
  user: userReducer
});

export default rootReducer;
