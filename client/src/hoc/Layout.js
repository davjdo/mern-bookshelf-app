import React from 'react';
import Header from '../components/Header';

const Layout = props => {
  return (
    <div>
      <Header />
      <div>{props.children}</div>
      FOOTER
    </div>
  );
};

export default Layout;