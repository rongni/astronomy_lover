import React, { useEffect } from "react";
import NavbarItem from './components/navbar_item';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import Home from "./components/home";
import NASAGallery from "./components/nasa_gallery"
import ListView from './components/ListView/ListView'
import Login from './auth/Login'
import Register from './auth/Register'
import "./App.css";
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';

export default function App() {
	useEffect(() => {
		// check for token in LS
		if (localStorage.token) {
		  setAuthToken(localStorage.token);
		}
		store.dispatch(loadUser());
	
		// log user out from all tabs if they log out in one tab
		window.addEventListener('storage', () => {
		  if (!localStorage.token) store.dispatch({ type: LOGOUT });
		});
	  }, []);

	return (
		<Provider store={store}>
			<Router>
				<NavbarItem />
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/nasagallery'>
						<span> </span>
						<p2> Gallery</p2>
						<NASAGallery />
					</Route>
					<Route path='/listview'>
						<ListView />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/register'>
						<Register />
					</Route>
				</Switch>
			</Router>
		</Provider>
	);
}
