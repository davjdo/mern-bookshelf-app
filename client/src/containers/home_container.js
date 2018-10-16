import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../actions';
import BookItem from '../components/ui/BookItem';

class HomeContainer extends Component {
  componentDidMount() {
    this.props.getBooks(2, 0);
  }

  renderBooks = books =>
    books.list
      ? books.list.map(book => <BookItem {...book} key={book._id} />)
      : null;

  loadMore = () => {
    let count = this.props.books.list.length;
    this.props.getBooks(2, count, 'asc', this.props.books.list);
  };

  render() {
    return (
      <div>
        {this.renderBooks(this.props.books)}
        <div className="loadmore" onClick={this.loadMore}>
          Load More
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

export default connect(
  mapStateToProps,
  { getBooks }
)(HomeContainer);
