import {
  GET_BOOK,
  GET_BOOKS,
  GET_BOOK_WITH_REVIEWER,
  CLEAR_BOOK_WITH_REVIEWER,
  ADD_BOOK,
  CLEAR_NEW_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  CLEAR_BOOK
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_BOOK:
      return {
        ...state,
        book: action.payload
      };
    case GET_BOOKS:
      return {
        ...state,
        list: action.payload
      };
    case GET_BOOK_WITH_REVIEWER:
      return {
        ...state,
        book: action.payload.book,
        reviewer: action.payload.reviewer
      };
    case CLEAR_BOOK_WITH_REVIEWER:
      return {
        ...state,
        book: action.payload.book,
        reviewer: action.payload.reviewer
      };
    case ADD_BOOK:
      return {
        ...state,
        newBook: action.payload
      };
    case CLEAR_NEW_BOOK:
      return {
        ...state,
        newBook: action.payload
      };
    case UPDATE_BOOK:
      return {
        ...state,
        updateBook: action.payload.success,
        book: action.payload.doc
      };
    case DELETE_BOOK:
      return {
        ...state,
        postDeleted: action.payload
      };
    case CLEAR_BOOK:
      return {
        ...state,
        book: action.payload.book,
        updateBook: action.payload.updateBook,
        postDeleted: action.payload.postDeleted
      };
    default:
      return state;
  }
}
