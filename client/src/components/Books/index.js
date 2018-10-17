import React from 'react';
import BooksContainer from '../../containers/books_container';

const BookView = props => {
  return (
    <div>
      <BooksContainer {...props} />
    </div>
  );
};

export default BookView;
