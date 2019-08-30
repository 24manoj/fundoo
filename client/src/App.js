import React from 'react';

import './App.css';
import register from '../src/Register';
import login from '../src/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom';



class App extends React.Component {
  // componentWillMount() {
  //   var query = queryString.parse(this.props.location.search);
  //   if (query.token) {
  //     window.localStorage.setItem("jwt", query.token);
  //     this.props.history.push("/");
  //   }
  // }
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={login} />
          <Route path="/register" component={register} />

        </Router>

      </div>
    );
  }
}

export default App;
