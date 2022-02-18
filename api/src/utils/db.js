import mongoose from 'mongoose'
import options from '../config'

export const connect = (url = options.dbUrl, opts = {}) => {
  console.log(options.dbUrl)
  return mongoose.connect(url, { ...opts, useNewUrlParser: true })
}
