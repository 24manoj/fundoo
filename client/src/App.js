import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "dotenv";
import reminder from './pages/reminder'
import DashBoard from "./pages/DashBoard";
import Login from "./components/Login";
import Register from "./components/Registration";
import ResetPassword from "./components/ResetPassword";
import Archive from './pages/Archive'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/resetPassword" component={ResetPassword} />
      <Route path="/Dashboard" component={DashBoard} />
      <Route path='/reminder' component={reminder} />
      <Route path='/archive' component={Archive}/>
    </Router>
    );
  }
  
  export default App;
