import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { signup, signin } from './utils/auth'
import { connect } from './utils/db'
import config from './config'

// Router controll
import universityRouter from './resources/universities/university.router'
import studentRouter from './resources/students/student.router'
import walletRouter from './resources/wallet/wallet.router'

const app = express()

app.disable('x-powered-by')
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// Router
app.use('/api/university', universityRouter)
app.post('/api/signup', signup)
app.post('/api/signin', signin)
app.use('/api/wallet', walletRouter)
app.use('/api/student', studentRouter)

// 404
app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Not found' })
})

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[unhandled]', err)
  res.status(500).json({ message: 'Internal server error' })
})

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error('Failed to start server:', e)
  }
}
