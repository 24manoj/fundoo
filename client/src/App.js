import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login'
import Register from './components/Registration'

function App() {
  return (
    <Router>
      <Route path='/' exact component={Login} />
      <Route path='/register' component={Register} />
    </Router>
  );
}

export default App;
