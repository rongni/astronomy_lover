import React from "react";
import NavbarItem from './components/navbar_item';
import { Switch, Route } from "react-router-dom";
import Home from "./components/home";
import ImageGallery from "./components/test"
import { NASAGallery } from "./components/gallery";
import "./App.css";

export default function App() {
	return (
		<div className='App'>
			<NavbarItem />
			<Switch>
				<Route exact path='/'>
					<p1>Home</p1>
					<Home />
				</Route>
				<Route path='/gallery'>
					<span> </span>
					<p2> Gallery</p2>
					<NASAGallery />
				</Route>
				<Route path='/test'>
					<span> </span>
					<p2> Test</p2>
					<ImageGallery />
				</Route>
			</Switch>
		</div>

	);
}
