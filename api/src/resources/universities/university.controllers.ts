import { University, db } from './university.model'
import { crudControllers } from '../../utils/crud'
import { list } from './university'

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async function () {
  console.log('Connection Successful!')
  try {
    University.insertMany(list)
    console.log('Documents already insert')
  } catch (e) {
    console.log('Multiple Documents inserted to Collection')
  }
})

export default crudControllers(University)

// overide
// export default {
//     ...crudControllers(University),
//     getOne(){

//     }
// }
