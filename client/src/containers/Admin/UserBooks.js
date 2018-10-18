import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserBooks } from '../../actions';
import moment from 'moment-js';
import { Link } from 'react-router-dom';

class UserBooks extends Component {
  componentDidMount() {
    this.props.getUserBooks(this.props.user.login.id);
  }

  showUserBooks = user =>
    user.userBooks
      ? user.userBooks.map(item => (
          <tr key={item._id}>
            <td>
              <Link to={`/user/edit-book/${item._id}`}>{item.name}</Link>
            </td>
            <td>{item.author}</td>
            <td>{moment(item.createAt).format('DD/MM/YY')}</td>
          </tr>
        ))
      : null;

  render() {
    let user = this.props.user;
    return (
      <div className="user_posts">
        <h4>Your books</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{this.showUserBooks(user)}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getUserBooks }
)(UserBooks);
