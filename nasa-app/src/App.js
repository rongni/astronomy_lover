import React from "react";
import NavbarItem from './components/navbar_item';
import { Switch, Route } from "react-router-dom";
import Home from "./components/home";
import NASAGallery from "./components/nasa_gallery"
import ListView from './components/ListView/ListView'
import "./App.css";
import UserProfile, { useremail } from './components/profile'
import UserLibrary from './components/library'
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
			</Switch>
		</div>

	);
}
