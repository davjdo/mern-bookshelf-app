import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBook, clearNewBook } from '../../actions';

class AddBook extends Component {
  state = {
    formdata: {
      name: '',
      author: '',
      review: '',
      pages: '',
      rating: '',
      price: ''
    }
  };

  componentWillUnmount() {
    this.props.clearNewBook();
  }

  handleInput = (e, name) => {
    const newFormdata = { ...this.state.formdata };
    newFormdata[name] = e.target.value;
    this.setState({
      formdata: newFormdata
    });
  };

  showNewBook = book =>
    book.post ? (
      <div className="conf_link">
        Cool !!{' '}
        <Link to={`/books/${book.bookId}`}>
          Click the <strong>link</strong> to see the post !
        </Link>
      </div>
    ) : null;

  onSubmit = e => {
    e.preventDefault();
    this.props.addBook({
      ...this.state.formdata,
      ownerId: this.props.user.login.id
    });
  };

  render() {
    return (
      <div className="rl_container article">
        <form onSubmit={e => this.onSubmit(e)}>
          <h2>Add a book</h2>
          <div className="form_element">
            <input
              type="text"
              placeholder="Enter name"
              value={this.state.formdata.name}
              onChange={e => this.handleInput(e, 'name')}
            />
          </div>
          <div className="form_element">
            <input
              type="text"
              placeholder="Enter author"
              value={this.state.formdata.author}
              onChange={e => this.handleInput(e, 'author')}
            />
          </div>
          <textarea
            type="text"
            value={this.state.formdata.review}
            placeholder="Enter a review"
            onChange={e => this.handleInput(e, 'review')}
          />
          <div className="form_element">
            <input
              type="number"
              placeholder="Enter pages"
              value={this.state.formdata.pages}
              onChange={e => this.handleInput(e, 'pages')}
            />
          </div>
          <div className="form_element">
            <select
              value={this.state.formdata.rating}
              onChange={e => this.handleInput(e, 'rating')}
            >
              <option val="1">1</option>
              <option val="2">2</option>
              <option val="3">3</option>
              <option val="4">4</option>
              <option val="5">5</option>
            </select>
          </div>
          <div className="form_element">
            <input
              type="text"
              placeholder="Enter price"
              value={this.state.formdata.price}
              onChange={e => this.handleInput(e, 'price')}
            />
          </div>
          <button type="submit">Add book</button>
          {this.props.books.newBook
            ? this.showNewBook(this.props.books.newBook)
            : null}
        </form>
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
  { addBook, clearNewBook }
)(AddBook);
