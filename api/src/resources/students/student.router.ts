import { Router } from 'express'
import { getMany, createOne, getOne } from './student.controllers'

const router = Router()

// /api/student
router.route('/').get(getMany).post(createOne)
router.route('/:id').get(getOne)
// /api/student/:id

export default router
