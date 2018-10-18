import React from 'react';
import Avatar from '../../assets/images/avatar.png';

const User = props => {
  let user = props.user.login;
  return (
    <div className="user_container">
      <div className="avatar">
        <img src={Avatar} alt="avatar" />
      </div>
      <div className="nfo">
        <div>
          <span>Name: </span> {user.name}
        </div>
        <div>
          <span>Lastname: </span> {user.lastname}
        </div>
        <div>
          <span>Email: </span> {user.email}
        </div>
      </div>
    </div>
  );
};

export default User;
