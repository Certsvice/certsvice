import { Router } from 'express'
import { getWallet } from './wallet.controllers'

const router = Router()

router.get('/', getWallet)
// router.put('/', updateMe)

export default router
