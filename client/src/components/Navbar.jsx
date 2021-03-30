import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles, createMuiTheme, ThemeProvider, Button, Toolbar, Typography } from '@material-ui/core'
import deepOrange from '@material-ui/core/colors/deepOrange'
import commonColor from '@material-ui/core/colors/grey'
import { logout } from '../util/auth.js'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepOrange[500],
    },
    secondary: {
      main: commonColor[50],
    },
  },
  typography: {
    fontFamily: 'monospace',
  },
})

const useStyles = makeStyles((theme) => ({
  toolbar: {
    flexWrap: 'wrap',
    paddingTop: '5px',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    fontWeight: 'bold',
  },
}))

const Pricing = (props) => {
  const classes = useStyles(theme)
  let history = useHistory()

  const noAuthLinks = () => {
    return (
      <>
        <Button component={Link} color='secondary' variant='text' to='/login' className={classes.link}>
          Login
        </Button>
        <Button component={Link} color='secondary' variant='text' to='/signup' className={classes.link}>
          Sign Up
        </Button>
      </>
    )
  }

  const authLinks = () => {
    return (
      <>
        <Button component={Link} color='secondary' variant='text' to='/profile' className={classes.link}>
          My Account
        </Button>
        <Button color='secondary' variant='text' className={classes.link} onClick={() => logout(history)}>
          Logout
        </Button>
      </>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position='static' color='primary'>
        <Toolbar className={classes.toolbar}>
          <Typography variant='h4' color='secondary' noWrap className={classes.toolbarTitle}>
            {'> weboard.'}
          </Typography>
          <nav>{props.authed ? authLinks() : noAuthLinks()}</nav>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Pricing
