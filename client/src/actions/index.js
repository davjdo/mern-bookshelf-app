import axios from 'axios';
import {
  GET_BOOKS,
  GET_BOOK_WITH_REVIEWER,
  CLEAR_BOOK_WITH_REVIEWER
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
