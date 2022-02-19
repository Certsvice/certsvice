import { merge } from 'lodash'
import { ConfigType } from '../types'
const env = process.env.NODE_ENV || 'dev'

const baseConfig: ConfigType = {
  env: env,
  isDev: env === 'dev',
  port: '8080',
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: `${process.env.JWT_EXP}h`,
  },
  dbUrl: ''
}

let envConfig = {}

switch (env) {
  case 'dev':
    envConfig = require('./dev').config
    break
  default:
    envConfig = require('./dev').config
}

export default merge(baseConfig, envConfig)
