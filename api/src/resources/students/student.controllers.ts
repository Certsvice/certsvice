import { crudControllers } from '../../utils/crud'
import { Student } from './student.model'

export default crudControllers(Student)

// overide
// export default {
//     ...crudControllers(Student),
//     getOne(){

//     }
// }
