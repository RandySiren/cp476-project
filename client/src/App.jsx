import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import Profile from './pages/Profile'
import Home from './pages/Home'
import { getSession } from './util/auth'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/signup' exact render={() => (getSession() ? <Redirect to='/' /> : <Signup />)} />
        <Route path='/login' exact render={() => (getSession() ? <Redirect to='/' /> : <Login />)} />
        <Route path='/posts/create' exact render={() => (getSession() ? <CreatePost /> : <Redirect to='/login' />)} />
        <Route path='/posts/*' exact render={() => (getSession() ? <Post /> : <Redirect to='/login' />)} />
        <Route path='/profile' exact render={() => (getSession() ? <Profile /> : <Redirect to='/login' />)} />
        <Route path='/' render={() => (getSession() ? <Home /> : <Redirect to='/login' />)} />
      </Switch>
    </Router>
  )
}

export default App
