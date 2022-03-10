import { Router } from 'express'
import { getMany, createOne, getOne } from './student.controllers'

const router = Router()

// /api/student
router.route('/').post(createOne)
router.route('/:id').get(getOne).post(getMany)
// /api/student/:id

export default router
