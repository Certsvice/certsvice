import { Router } from 'express'
import controllers from './university.controllers'

const router = Router()

router.route('/').get(controllers.getMany)

export default router
