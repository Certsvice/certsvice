import { Router } from 'express'
import { getMany, createOne, getOne, deleteOne } from './student.controllers'

const router = Router()

// /api/student
router.route('/').post(createOne)
router.route('/:id').get(getOne).post(getMany).delete(deleteOne)
// /api/student/:id

export default router
