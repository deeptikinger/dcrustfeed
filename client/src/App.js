
import React, { useEffect, createContext, useReducer, useContext } from 'react';

import NavBar from './components/Navbar'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/createPost'
import "./App.css";
import { reducer, initialState } from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUser from './components/screens/SubscribedUser'
export const UserContext = createContext()

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "USER", payload: user })
      // history.push('/')
    } else {
      history.push('/login')
    }
  }, [])

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
        </Route>
        <Route path="/myfollowingpost">
        <SubscribedUser />
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );

}

export default App;
