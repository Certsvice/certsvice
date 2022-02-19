import mongoose from 'mongoose'
import options from '../config'
import { list } from '../resources/universities/university'
import { University } from '../resources/universities/university.model'

export const connect = async (url = options.dbUrl) => {
  try {
    mongoose.connect(url)
    console.log(url)
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', async function () {
      console.log('Connection Successful!')
      try {
        await University.insertMany(list)
        console.log('Documents already insert')
      } catch (e) {
        console.log('Multiple Documents inserted to Collection')
      }
    })
    return true
  } catch (e) {
    console.log('error')
    return false
  }

}
