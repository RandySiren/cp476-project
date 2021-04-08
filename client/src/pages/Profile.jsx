import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PostItem from '../components/PostItem'
import { Container, Grid, makeStyles, createMuiTheme, ThemeProvider, Typography } from '@material-ui/core'
import { Box } from '@material-ui/core'
import deepOrange from '@material-ui/core/colors/deepOrange'
import commonColor from '@material-ui/core/colors/grey'
import { getPostsByUserID, deletePost } from '../api/post.js'
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
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  createPostParent: {
    display: 'flex',
    justifyContent: 'right',
  },
  createPost: {
    width: '20%',
  },
}))
const Profile = () => {
  const classes = useStyles(theme)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const onDelete = async (id) => {
    try {
      await deletePost(id)
      setPosts([])
      fetchData()
    } catch (err) {
      console.log(err)
    }
  }

  const fetchData = async () => {
    try {
      const { data } = await getPostsByUserID(undefined)
      await data.map(async ({ _id: id, authorName: author, title, date }) => {
        const postInfo = { id, author, title, date: dayjs(date).format('DD/MM/YYYY'), pureDate: date }
        setPosts((prevState) => [...prevState, postInfo])
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Navbar authed={true} />
        <Container component='main' maxWidth='md' className={classes.paper}>
          <Box className={classes.createPostParent}>
            <Typography variant='h4'>My Posts</Typography>
          </Box>
          <Box mb={3} />
          <Grid container direction='column' justify='center' alignItems='stretch' spacing={1}>
            {[]
              .concat(posts)
              .sort((a, b) => (a.pureDate < b.pureDate ? 1 : -1))
              .map((post) => {
                return (
                  <Grid item xs={12} sm={12} key={post.id}>
                    <PostItem
                      id={post.id}
                      title={post.title}
                      author={post.author}
                      date={post.date}
                      key={post.id}
                      showDelete={true}
                      onDelete={onDelete}
                    />
                  </Grid>
                )
              })}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default Profile
