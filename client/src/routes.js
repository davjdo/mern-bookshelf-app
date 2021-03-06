import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout';
import Auth from './hoc/auth';
import Home from './components/Home';
import BooksContainer from './containers/books_container';
import Login from './containers/Admin/Login';
import Register from './containers/Admin/Register';
import Logout from './components/Admin/Logout';
import User from './components/Admin';
import AddBook from './containers/Admin/AddBook';
import UserBooks from './containers/Admin/UserBooks';
import EditBooks from './containers/Admin/EditBook';

const Routes = () => {
	return (
		<div>
			<Layout>
				<Switch>
					<Route
						path="/user/edit-book/:id"
						exact
						component={Auth(EditBooks, true)}
					/>
					<Route
						path="/user/user-books"
						exact
						component={Auth(UserBooks, true)}
					/>
					<Route path="/user/add" exact component={Auth(AddBook, true)} />
					<Route path="/user" exact component={Auth(User, true)} />
					<Route path="/user/register" exact component={Auth(Register, true)} />
					<Route path="/user/logout" exact component={Auth(Logout, true)} />
					<Route path="/login" exact component={Auth(Login, false)} />
					<Route
						path="/books/:id"
						exact
						component={Auth(BooksContainer, null)}
					/>
					<Route path="/" exact component={Auth(Home, null)} />
				</Switch>
			</Layout>
		</div>
	);
};

export default Routes;
