import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import PostItem from '../components/PostItem'
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
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
  },
}))
const Home = () => {
  const classes = useStyles(theme)
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar authed={true} />
        <Container component='main' maxWidth='md' className={classes.paper}>
          <Grid container direction='column' justify='center' alignItems='stretch' spacing={1}>
            <Grid item xs={12} sm={12}>
              <PostItem title='AITA' author='Manny' date='Mar. 21, 2021' />
            </Grid>
            <Grid item xs={12} sm={12}>
              <PostItem title='AITA' author='Manny' date='Mar. 21, 2021' />
            </Grid>
            <Grid item xs={12} sm={12}>
              <PostItem title='AITA' author='Manny' date='Mar. 21, 2021' />
            </Grid>
            <Grid item xs={12} sm={12}>
              <PostItem title='AITA' author='Manny' date='Mar. 21, 2021' />
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default Home
