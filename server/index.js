import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import helmet from 'helmet'
import chalk from 'chalk'
import connect from './connection.js'

import userRouteHandler from './routes/user.js'
import postsRouteHandler from './routes/posts.js'

const app = express()

// Setup
const __dirname = path.resolve(path.dirname(''))
dotenv.config({ path: path.resolve(__dirname, '.env') })
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(helmet())
app.set('port', process.env.PORT)
app.set('db-uri', process.env.DB_URI)

// Connect to database
connect(app.get('db-uri'))

// Routes for back-end and auth
app.use('/user', userRouteHandler)
app.use('/posts', postsRouteHandler)

app.listen(app.get('port'), () => {
  console.log('%s App is running on port %d', chalk.green('✓'), app.get('port'))
  console.log('Press CTRL-C to stop.\n')
})
