import React, { useState } from 'react'
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Box,
} from '@material-ui/core'
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
    fontFamily: 'sans-serif',
  },
})
const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '2px'
  },
}))

const PostItem = ({ title, author, date }) => {
  const classes = useStyles(theme)
  return (
    <ThemeProvider theme={theme}>
      <Card variant='outlined'>
        <CardHeader className={classes.root} title={title}></CardHeader>
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
        </Box>
      </Card>
    </ThemeProvider>
  )
}

export default PostItem
