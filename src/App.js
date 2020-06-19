import React, { Component } from 'react';
import Register from './pages/Register'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Profile from './pages/Profile';
import Login from './pages/Login';
import Home from './pages/Home';

class App extends Component {
  render() {
    return(
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Register} />
            <Route  path='/profile/:username' component={Profile} />
            <Route path='/login' component={Login}/>
            <Route path='/welcome/:username' component={Home}/>
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
