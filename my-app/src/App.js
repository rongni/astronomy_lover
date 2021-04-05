import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import ListView from './components/ListView/ListView'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Route exact path='/' component={ListView} />
        <Route path='/list-view' component={ListView} />
      </div>
    </BrowserRouter>
  );
}

export default App;
