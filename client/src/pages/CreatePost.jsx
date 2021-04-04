import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useHistory } from 'react-router-dom'
import { Container, Grid, makeStyles, createMuiTheme, ThemeProvider, Button } from '@material-ui/core'
import { Typography, TextField, Box, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import deepOrange from '@material-ui/core/colors/deepOrange'
import commonColor from '@material-ui/core/colors/grey'
import { postCreatePost } from '../api/post.js'

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
const CreatePost = () => {
  const classes = useStyles(theme)
  const [fail, setFail] = useState(false)
  let history = useHistory()

  const handlePost = async (e) => {
    e.preventDefault()
    try {
      let response = await postCreatePost({
        title: e.target.title.value,
        content: e.target.content.value,
      })
      if (response.status === 200) {
        history.push(`/posts/${response.data.result}`)
      } else {
        setFail(true)
      }
    } catch (err) {
      setFail(true)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Navbar authed={true} />
        <Container component='main' maxWidth='md' className={classes.paper}>
          <Typography variant='h4'>Create Post</Typography>
          <form className={classes.form} onSubmit={handlePost}>
            <Grid container direction='column' justify='center' alignItems='stretch' spacing={4}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete='title'
                  name='title'
                  variant='outlined'
                  required
                  fullWidth
                  id='title'
                  label='Enter Title'
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete='content'
                  name='content'
                  variant='outlined'
                  required
                  fullWidth
                  id='content'
                  multiline
                  rows='10'
                />
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Button type='submit' style={{ width: '200px' }} variant='contained' color='primary'>
              Create Post
            </Button>
          </form>
          {fail ? (
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              open={fail}
              autoHideDuration={5000}
              onClose={() => setFail(false)}
            >
              <Alert onClose={() => setFail(false)} severity='error'>
                Failed to create post.
              </Alert>
            </Snackbar>
          ) : (
            <></>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default CreatePost
