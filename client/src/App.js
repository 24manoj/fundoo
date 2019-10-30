import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import "dotenv";
import reminder from './pages/reminder'
import DashBoard from "./pages/DashBoard";
import Login from "./components/Login";
import Register from "./components/Registration";
import ResetPassword from "./components/ResetPassword";
import Archive from './pages/Archive'
import Trash from './pages/Trash'
import Labels from './pages/labels'
class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/resetPassword" component={ResetPassword} />
        <Route path="/Dashboard" component={DashBoard} />
        <Route path='/reminder' component={reminder} />
        <Route path='/archive' component={Archive} />
        <Route path='/trash' component={Trash} />
        <Route path='/labels' component={Labels} />
      </Router>
    )
  }
}
export default App;
