import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const SidenavItems = () => {
  const items = [
    {
      type: 'navItem',
      icon: 'home',
      text: 'Home',
      link: '/',
      restricted: false
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'My profile',
      link: '/user',
      restricted: true
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Add admins',
      link: '/user/register',
      restricted: true
    },
    {
      type: 'navItem',
      icon: 'sign-in',
      text: 'Login',
      link: '/login',
      restricted: false
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'My books',
      link: '/user/user-books',
      restricted: true
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Add a book',
      link: '/user/add',
      restricted: true
    },
    {
      type: 'navItem',
      icon: 'sign-out',
      text: 'Logout',
      link: '/user/logout',
      restricted: true
    }
  ];

  const element = (item, i) => (
    <div key={i} className={item.type}>
      <Link to={item.link}>
        <FontAwesome name={item.icon} />
        {item.text}
      </Link>
    </div>
  );

  const showItems = () =>
    items.map((item, i) => {
      return element(item, i);
    });

  return <div>{showItems()}</div>;
};

export default SidenavItems;
