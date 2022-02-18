import { Router } from 'express'
import { getUniversity } from './university.controllers'

const router = Router()

router.get('/', getUniversity)
// router.put('/', updateMe)

export default router
