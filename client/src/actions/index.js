import axios from 'axios';
import {
  GET_BOOKS,
  GET_BOOK_WITH_REVIEWER,
  CLEAR_BOOK_WITH_REVIEWER,
  USER_LOGIN,
  AUTH,
  ADD_BOOK,
  CLEAR_NEW_BOOK
} from './types';

export const getBooks = async (
  limit = 10,
  start = 0,
  order = 'asc',
  list = ''
) => {
  const request = await axios
    .get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
    .then(response => {
      if (list) {
        return [...list, ...response.data];
      } else {
        return response.data;
      }
    });
  return {
    type: GET_BOOKS,
    payload: request
  };
};

export const getBookWithReviewer = id => {
  const request = axios.get(`/api/books/${id}`);
  return dispatch => {
    request.then(({ data }) => {
      let book = data;
      axios.get(`/api/books/book_reviewer/${book.ownerId}`).then(({ data }) => {
        let response = {
          book,
          reviewer: data
        };
        dispatch({
          type: GET_BOOK_WITH_REVIEWER,
          payload: response
        });
      });
    });
  };
};

export const clearBookWithReviewer = () => {
  return {
    type: CLEAR_BOOK_WITH_REVIEWER,
    payload: {
      book: {},
      reviewer: {}
    }
  };
};

export const addBook = newBook => {
  const request = axios
    .post('/api/books', newBook)
    .then(response => response.data);
  return {
    type: ADD_BOOK,
    payload: request
  };
};

export const clearNewBook = () => {
  return {
    type: CLEAR_NEW_BOOK,
    payload: {}
  };
};

// USER ACTIONS

export const auth = () => {
  const request = axios.get('/api/users/auth').then(response => response.data);
  return {
    type: AUTH,
    payload: request
  };
};

export const loginUser = ({ email, password }) => {
  const request = axios
    .post('/api/users/login', { email, password })
    .then(response => response.data);
  return {
    type: USER_LOGIN,
    payload: request
  };
};
