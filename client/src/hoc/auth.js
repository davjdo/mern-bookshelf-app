import React, { Component } from 'react';
import { auth } from '../actions';
import { connect } from 'react-redux';

export default function(ComposedClass, reload) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true
    };

    componentDidMount() {
      this.props.auth().then(response => {
        let user = this.props.user.login;
        if (!user.isAuth) {
          if (reload) {
            this.props.history.push('/login');
          }
        } else {
          if (reload === false) {
            this.props.history.push('/user');
          }
        }
        this.setState({ loading: false });
      });
    }

    render() {
      if (this.state.loading) {
        return <div className="loader">Loading ...</div>;
      }
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }
  const mapStateToProps = state => {
    return {
      user: state.user
    };
  };
  return connect(
    mapStateToProps,
    { auth }
  )(AuthenticationCheck);
}
