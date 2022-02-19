import { Router } from 'express'
import { getMany } from './university.controllers'

const router = Router()

router.get('/',getMany)

export default router
