import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useHistory } from 'react-router-dom'
import { Container, Grid, makeStyles, createMuiTheme, ThemeProvider, Button } from '@material-ui/core'
import { Typography, TextField, Link as MaterialLink, Box, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import deepOrange from '@material-ui/core/colors/deepOrange'
import commonColor from '@material-ui/core/colors/grey'

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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
}))
const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar authed={true} />
        <p>Test</p>
      </div>
    </ThemeProvider>
  )
}

export default Home
