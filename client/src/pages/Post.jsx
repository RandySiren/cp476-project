import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PostItem from '../components/PostItem'
import { Link, useHistory } from 'react-router-dom'
import { Container, Grid, makeStyles, createMuiTheme, ThemeProvider, Button, Typography } from '@material-ui/core'
import { Box } from '@material-ui/core'
import deepOrange from '@material-ui/core/colors/deepOrange'
import commonColor from '@material-ui/core/colors/grey'
import { getPostByID } from '../api/post.js'
import dayjs from 'dayjs'

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
  createPostParent: {
    display: 'flex',
    justifyContent: 'right',
  },
  createPost: {
    width: '20%',
  },
}))
const Post = () => {
  const classes = useStyles(theme)
  const [post, setPost] = useState()
  let history = useHistory()

  useEffect(() => {
    fetchPost()
  }, [])

  const fetchPost = async () => {
    try {
      const id = history.location.pathname.split('/')[2]
      const resp = await getPostByID(id)
      setPost(resp.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Navbar authed={true} />
        <Container component='main' maxWidth='md' className={classes.paper}>
            <Typography variant='h4'>{post.title}</Typography>
            <Typography variant='h6'>{post.content}</Typography>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default Post
