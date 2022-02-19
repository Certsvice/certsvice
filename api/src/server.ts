import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { signup, signin, protect } from './utils/auth'
import { connect } from './utils/db'
import { verifyStatus } from './utils/verify'
import config from './config'

// Router controll
import universityRouter from './resources/universities/university.router'
import studentRouter from './resources/students/student.router'

const app = express()

app.disable('x-powered-by')
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api/university', universityRouter)
app.get('/api/status/:address', verifyStatus)
app.post('/api/signup', signup)
app.post('/api/signin', signin)

app.use('/api', protect)
app.use('/api/student', studentRouter)

export const start = async () => {
  try {
    connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error('error')
  }
}
