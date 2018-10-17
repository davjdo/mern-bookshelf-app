import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout';
import Home from './components/Home';
import BookView from './components/Books';

const Routes = () => {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/books/:id" exact component={BookView} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Layout>
    </div>
  );
};

export default Routes;
