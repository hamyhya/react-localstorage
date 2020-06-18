import React, { Component } from 'react';
import Register from './pages/Register'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Profile from './pages/Profile';

class App extends Component {
  render() {
    return(
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Register} />
            <Route  path='/welcome/:username' component={Profile} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
