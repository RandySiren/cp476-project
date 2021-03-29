import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useHistory } from 'react-router-dom'
import { Container, Grid, makeStyles, createMuiTheme, ThemeProvider, Button } from '@material-ui/core'
import { Typography, TextField, Link as MaterialLink, Box, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import deepOrange from '@material-ui/core/colors/deepOrange'
import commonColor from '@material-ui/core/colors/grey'
import { postSignup } from '../api/auth.js'

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

const Signup = () => {
  const classes = useStyles(theme)
  const [fail, setFail] = useState(false)
  let history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response = await postSignup({
        email: e.target.email.value,
        name: e.target.name.value,
        password: e.target.password.value,
      })
      if (response.status === 201) {
        history.push('/login')
      } else {
        setFail(true)
      }
    } catch (err) {
      setFail(true)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar authed={false} />
        <Container component='main' maxWidth='sm' className={classes.paper}>
          <Typography variant='h4'>Sign Up</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container direction='column' justify='center' alignItems='stretch' spacing={4}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete='email'
                  name='email'
                  variant='outlined'
                  required
                  fullWidth
                  type='email'
                  id='email'
                  label='E-mail'
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete='name'
                  name='name'
                  variant='outlined'
                  required
                  fullWidth
                  id='name'
                  label='Name'
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete='password'
                  name='password'
                  variant='outlined'
                  required
                  fullWidth
                  id='password'
                  label='Password'
                  type='password'
                />
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Grid container justify='center' spacing={4}>
              <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                Register
              </Button>
              <Box m={2} />
            </Grid>
            <Grid container justify='flex-end'>
              <Grid item>
                <MaterialLink component={Link} to='/login' variant='body2'>
                  Already have an account? Log In
                </MaterialLink>
              </Grid>
            </Grid>
          </form>
          {fail ? (
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              open={fail}
              autoHideDuration={5000}
              onClose={() => setFail(false)}
            >
              <Alert onClose={() => setFail(false)} severity='error'>
                Failed to sign up, please try again.
              </Alert>
            </Snackbar>
          ) : (
            <></>
          )}
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default Signup
