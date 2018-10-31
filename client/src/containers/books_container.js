import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBookWithReviewer, clearBookWithReviewer } from '../actions';
import BookView from '../components/Books';

class BooksContainer extends Component {
	componentDidMount() {
		this.props.getBookWithReviewer(this.props.match.params.id);
	}

	componentWillUnmount() {
		this.props.clearBookWithReviewer();
	}

	renderBook = books =>
		books.book ? <BookView {...books} key={books.book._id} /> : null;

	render() {
		let books = this.props.books;
		return <div>{this.renderBook(books)}</div>;
	}
}

const mapStateToProps = state => {
	return {
		books: state.books
	};
};

export default connect(
	mapStateToProps,
	{ getBookWithReviewer, clearBookWithReviewer }
)(BooksContainer);
