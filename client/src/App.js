import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login'

function App() {
  return (
    <Router>
      <Route path='/' exact component={Login} />
    </Router>
  );
}

export default App;
