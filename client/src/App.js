import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'dotenv'
import dashBoard from './pages/DashBoard'
import Login from './components/Login'
import Register from './components/Registration'
import ResetPassword from './components/ResetPassword'

function App() {
  return (
    <Router>
      <Route path='/' exact component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/resetPassword' component={ResetPassword} />
      <Route path='/dashboard' component={dashBoard} />
    </Router>
  );
}

export default App;
