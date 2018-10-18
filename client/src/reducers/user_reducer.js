import { USER_LOGIN, AUTH, GET_USER_BOOKS } from '../actions/types';

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
    default:
      return state;
  }
}
