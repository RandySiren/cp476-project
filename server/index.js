import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import helmet from 'helmet'
import routeHandler from './routes/index.js'
import chalk from 'chalk'
import connect from './connection.js'

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
connect(app.get('db-uri'))

app.use(routeHandler)

app.listen(app.get('port'), () => {
  console.log('%s App is running on port %d', chalk.green('✓'), app.get('port'))
  console.log('Press CTRL-C to stop.\n')
})
