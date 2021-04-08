import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PostItem from '../components/PostItem'
import { Link } from 'react-router-dom'
import { Container, Grid, makeStyles, createMuiTheme, ThemeProvider, Button } from '@material-ui/core'
import { Box } from '@material-ui/core'
import deepOrange from '@material-ui/core/colors/deepOrange'
import commonColor from '@material-ui/core/colors/grey'
import { getPosts } from '../api/post.js'
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
const Home = () => {
  const classes = useStyles(theme)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getPosts()
        await data.map(async ({ _id: id, authorName: author, title, date }) => {
          const postInfo = { id, author, title, date: dayjs(date).format('DD/MM/YYYY'), pureDate: date }
          setPosts((prevState) => [...prevState, postInfo])
        })
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Navbar authed={true} />
        <Container component='main' maxWidth='md' className={classes.paper}>
          <Box className={classes.createPostParent}>
            <Button
              component={Link}
              variant='contained'
              color='primary'
              className={classes.createPost}
              to='/posts/create'
            >
              + Create Post
            </Button>
          </Box>
          <Box mb={3} />
          <Grid container direction='column' justify='center' alignItems='stretch' spacing={1}>
            {[]
              .concat(posts)
              .sort((a, b) => (a.pureDate < b.pureDate ? 1 : -1))
              .map((post) => {
                return (
                  <Grid item xs={12} sm={12} key={post.id}>
                    <PostItem id={post.id} title={post.title} author={post.author} date={post.date} key={post.id} />
                  </Grid>
                )
              })}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default Home
