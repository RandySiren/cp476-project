import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { getSession } from './util/auth'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/signup' exact render={() => (getSession() ? <Redirect to='/' /> : <Signup />)} />
        <Route path='/login' exact render={() => (getSession() ? <Redirect to='/' /> : <Login />)} />
        <Route path='/' render={() => (getSession() ? <Home /> : <Redirect to='/login' />)} />
      </Switch>
    </Router>
  )
}

export default App
