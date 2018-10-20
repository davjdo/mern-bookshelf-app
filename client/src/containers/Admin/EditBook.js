import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBook, updateBook, deleteBook, clearBook } from '../../actions';

class EditBook extends PureComponent {
  state = {
    formdata: {
      _id: this.props.match.params.id,
      name: '',
      author: '',
      review: '',
      pages: '',
      rating: '',
      price: ''
    }
  };

  componentDidMount() {
    this.props.getBook(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    let book = nextProps.books.book;
    let newFormdata = { ...this.state.formdata };
    for (let key in newFormdata) {
      newFormdata[key] = book[key];
    }
    this.setState({
      formdata: newFormdata
    });
  }

  componentWillUnmount() {
    this.props.clearBook();
  }

  handleInput = (e, name) => {
    const newFormdata = { ...this.state.formdata };
    newFormdata[name] = e.target.value;
    this.setState({
      formdata: newFormdata
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.updateBook(this.state.formdata);
  };

  onDeleteBook = () => {
    this.props.deleteBook(this.props.match.params.id);
  };

  redirectUser = () => {
    setTimeout(() => {
      this.props.history.push('/user/user-books');
    }, 1000);
  };

  render() {
    let books = this.props.books;
    return (
      <div className="rl_container article">
        {books.updateBook ? (
          <div className="edit_confirm">
            post updated,{' '}
            <Link to={`/books/${books.book._id}`}>
              Click here to see your post
            </Link>
          </div>
        ) : null}
        {books.postDeleted ? (
          <div className="red_tag">
            Post deleted
            {this.redirectUser()}
          </div>
        ) : null}
        <form onSubmit={e => this.onSubmit(e)}>
          <h2>Edit a book</h2>
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
          <button type="submit">Edit book</button>
          <div className="delete_post" style={{ cursor: 'pointer' }}>
            <div className="button" onClick={this.onDeleteBook}>
              Delete book
            </div>
          </div>
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
  { getBook, updateBook, deleteBook, clearBook }
)(EditBook);
