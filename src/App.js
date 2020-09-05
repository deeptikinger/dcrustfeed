import React, { Component } from 'react';
import NavBar from './components/Navbar'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/createPost'
import "./App.css";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/createpost">
          <CreatePost/>
        </Route>
      </BrowserRouter>

    );
  }
}

export default App;
