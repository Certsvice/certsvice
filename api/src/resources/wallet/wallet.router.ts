import { Router } from 'express'
import { getUniversity } from './wallet.controllers'

const router = Router()

router.get('/', getUniversity)
// router.put('/', updateMe)

export default router
