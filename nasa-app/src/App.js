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
<<<<<<< HEAD
import UserProfile, { useremail } from './components/profile'
import UserLibrary from './components/library'
import TestView from "./components/test";
export default function App() {
	return (
		<div className='App'>
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
				<Route path='/profile'>
					<UserProfile />
				</Route>
				<Route path='/library'>
					<UserLibrary />
				</Route>
				<Route path='/test'>
					<TestView />
				</Route>
			</Switch>
		</div>
=======
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
>>>>>>> c2f6f725553d24f434041d2fef11c8b9c7da45e0

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
