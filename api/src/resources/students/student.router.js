import { Router } from 'express'
import controllers from './student.controllers'

const router = Router()

// /api/student
router.route('/').get(controllers.getMany).post(controllers.createOne)

// /api/student/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
