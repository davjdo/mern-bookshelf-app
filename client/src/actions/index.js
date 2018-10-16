import axios from 'axios';
import { GET_BOOKS } from './types';

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
