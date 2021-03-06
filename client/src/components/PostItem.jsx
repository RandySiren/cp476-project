import React from 'react'
import { Link } from 'react-router-dom'
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Box,
  Button,
  Link as MaterialLink,
} from '@material-ui/core'
import deepOrange from '@material-ui/core/colors/deepOrange'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepOrange[500],
    },
    secondary: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: 'sans-serif',
  },
})
const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '2px',
  },
}))

const PostItem = ({ id, title, author, date, showDelete, onDelete }) => {
  const classes = useStyles(theme)

  return (
    <ThemeProvider theme={theme}>
      <Card variant='outlined'>
        <MaterialLink color='secondary' component={Link} underline='none' to={`/posts/${id}`}>
          <CardHeader className={classes.root} title={title}></CardHeader>
        </MaterialLink>
        <Box display='flex' justifyContent='flex-end'>
          <CardContent>
            <Typography className={classes.title} variant='body2' color='textSecondary'>
              {author}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography className={classes.title} variant='body2' color='textSecondary'>
              {date}
            </Typography>
          </CardContent>
          {showDelete ? (
            <CardContent style={{ padding: '10px' }}>
              <Button
                variant='outlined'
                color='secondary'
                style={{ fontFamily: 'monospace', padding: '3px' }}
                className={classes.createPost}
                onClick={() => onDelete(id)}
              >
                Delete
              </Button>
            </CardContent>
          ) : (
            <></>
          )}
        </Box>
      </Card>
    </ThemeProvider>
  )
}

export default PostItem
