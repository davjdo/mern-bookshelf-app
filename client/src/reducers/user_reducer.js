import { USER_LOGIN, AUTH } from '../actions/types';

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
    default:
      return state;
  }
}
