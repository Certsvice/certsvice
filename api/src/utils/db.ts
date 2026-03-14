import mongoose from 'mongoose'
import options from '../config'
import { list } from '../resources/universities/university'
import { University } from '../resources/universities/university.model'

export const connect = async (url = options.dbUrl) => {
  try {
    await mongoose.connect(url)
    console.log('MongoDB connected')
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', async function () {
      console.log('Connection Successful!')
      try {
        await University.insertMany(list, { ordered: false })
        console.log('Seed data inserted')
      } catch (e) {
        // Duplicate key errors are expected on re-runs — seed data already exists
      }
    })
    return true
  } catch (e) {
    console.error('MongoDB connection failed:', e)
    return false
  }
}
