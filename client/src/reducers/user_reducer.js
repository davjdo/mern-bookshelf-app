import {
  USER_LOGIN,
  AUTH,
  GET_USER_BOOKS,
  GET_USERS,
  USER_REGISTER
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        login: action.payload
      };
    case USER_LOGIN:
      return {
        ...state,
        login: action.payload
      };
    case GET_USER_BOOKS:
      return {
        ...state,
        userBooks: action.payload
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case USER_REGISTER:
      return {
        ...state,
        register: action.payload.success,
        users: action.payload.users
      };
    default:
      return state;
  }
}
