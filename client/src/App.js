import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Nav from "./nav";
import Welcome from "./welcome";
import PrivateRoute from "./privateRoute";
import UserList from "./userlist";
import JoinForm from "./join";

function App() {
  return (
    <Router>
      <Route path="/" render={props => <Nav {...props} />} />
      <div className="app">
        <Route exact path="/" render={props => <Welcome {...props} />} />
        <Route path="/join" render={props => <JoinForm {...props}/>}/>
        <PrivateRoute path="/userlist" component={UserList} />
      </div>
    </Router>
  );
}

export default App;