import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUsers, userRegister } from '../../actions';

class Register extends PureComponent {
  state = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    error: ''
  };

  componentDidMount() {
    this.props.getUsers();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.user.register === false) {
  //     this.setState({ error: 'Error, try again' });
  //   } else {
  //     this.setState({
  //       name: '',
  //       lastname: '',
  //       email: '',
  //       password: ''
  //     });
  //   }
  // }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.user.register === false) {
      return {
        error: 'Error, try again'
      };
    } else if (nextProps.user.register === true) {
      return {
        name: '',
        lastname: '',
        email: '',
        password: ''
      };
    }
    return null;
  }

  handleInputName = event => {
    this.setState({
      name: event.target.value
    });
  };
  handleInputLastname = event => {
    this.setState({
      lastname: event.target.value
    });
  };

  handleInputEmail = event => {
    this.setState({
      email: event.target.value
    });
  };
  handleInputPassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ error: this.state.error });
    this.props.userRegister(
      {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        lastname: this.state.lastname
      },
      this.props.user.users
    );
  };

  renderUsers = user =>
    user.users
      ? user.users.map(item => (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
          </tr>
        ))
      : null;

  render() {
    let user = this.props.user;
    return (
      <div className="rl_container">
        <form onSubmit={e => this.onSubmit(e)}>
          <h2>Add User</h2>
          <div className="form_element">
            <input
              type="text"
              placeholder="Enter your name"
              value={this.state.name}
              onChange={this.handleInputName}
            />
          </div>
          <div className="form_element">
            <input
              type="text"
              placeholder="Enter your lastname"
              value={this.state.lastname}
              onChange={this.handleInputLastname}
            />
          </div>
          <div className="form_element">
            <input
              type="email"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={this.handleInputEmail}
            />
          </div>
          <div className="form_element">
            <input
              type="password"
              placeholder="Enter your password"
              value={this.state.password}
              onChange={this.handleInputPassword}
            />
          </div>
          <button type="submit">Add user</button>
          <div className="error">{this.state.error}</div>
        </form>
        <div className="current_users">
          <h4>Current users:</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Lastname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>{this.renderUsers(user)}</tbody>
          </table>
        </div>
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
  { getUsers, userRegister }
)(Register);
