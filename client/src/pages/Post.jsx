import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PostItem from '../components/PostItem'
import { Link, useHistory } from 'react-router-dom'
import {
  Container,
  Grid,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  Button,
  Typography,
  TextField,
  Snackbar,
  Box,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import deepOrange from '@material-ui/core/colors/deepOrange'
import commonColor from '@material-ui/core/colors/grey'
import { getPostByID, postCreateComment } from '../api/post.js'
import dayjs from 'dayjs'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepOrange[500],
    },
    secondary: {
      main: commonColor[600],
    },
  },
  typography: {
    fontFamily: 'Sans-serif',
  },
})

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
  },
  post: {
    borderLeft: '1px grey solid',
    padding: '15px',
    marginBottom: '10px',
  },
  comment: {
    borderLeft: '1px grey solid',
    marginLeft: '20px',
    marginBottom: '10px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}))
const Post = () => {
  const classes = useStyles(theme)
  const [fail, setFail] = useState(false)
  const [post, setPost] = useState({})
  const [commentText, setCommentText] = useState('')
  let history = useHistory()

  const fetchPost = async () => {
    try {
      const id = history.location.pathname.split('/')[2]
      const resp = await getPostByID(id)
      setPost(resp.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitComment = async (e) => {
    e.preventDefault()
    try {
      let response = await postCreateComment(post._id, commentText)
      if (response.status === 200) {
        fetchPost()
      } else {
        setFail(true)
      }
    } catch (err) {
      setFail(true)
    }
  }

  const commentTextChange = (e) => {
    setCommentText(e.target.value)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Navbar authed={true} />
        <Container component='main' maxWidth='md' className={classes.paper}>
          <Typography variant='h4'>{post.title}</Typography>
          <Typography color='secondary' variant='body2'>{post.authorName + ' - ' + dayjs(post.date).format('DD/MM/YYYY')}</Typography>
          <Container className={classes.post}>
            <Typography variant='body1'>{post.content}</Typography>
          </Container>
          {[]
            .concat(post.comments)
            .sort((a, b) => (a.date < b.date ? 1 : -1))
            .map((comment) =>
              comment ? (
                <Container key={comment._id} className={classes.comment}>
                  <Typography color='secondary' variant='body2'>
                    {comment.authorName + ' - ' + dayjs(comment.date).format('DD/MM/YYYY')}
                  </Typography>
                  <Typography variant='body1'>
                    {comment.content.split('\n').map((item) => (
                      <span key={item}>
                        {item}
                        <br />
                      </span>
                    ))}
                  </Typography>
                </Container>
              ) : (
                <></>
              )
            )}
          <Box mb={4} />
          <Container>
            <TextField variant='outlined' fullWidth multiline rows='4' onChange={commentTextChange} />
            <Box mb={2} />
            <Button style={{ width: '200px' }} variant='contained' color='primary' onClick={submitComment}>
              Submit Comment
            </Button>
          </Container>
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

export default Post
