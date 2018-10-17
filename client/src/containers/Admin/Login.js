import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    success: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.login.isAuth) {
      this.props.history.push('/user');
    }
  }

  handleInputEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleInputPassword = event => {
    this.setState({ password: event.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.loginUser(this.state);
  };

  render() {
    let { user } = this.props;
    return (
      <div className="rl_container">
        <form onSubmit={e => this.onSubmit(e)}>
          <h2>Log in here</h2>
          <div className="form_element">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={this.handleInputEmail}
            />
          </div>
          <div className="form_element">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={this.state.password}
              onChange={this.handleInputPassword}
            />
          </div>
          <button type="submit">Log in</button>
          <div className="error">
            {user.login ? <div>{user.login.message}</div> : null}
          </div>
        </form>
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
  { loginUser }
)(Login);
