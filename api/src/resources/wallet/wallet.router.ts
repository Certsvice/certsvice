import { Router } from 'express'
import { getWallets, getWallet } from './wallet.controllers'

const router = Router()

router.get('/', getWallets)
// router.put('/', updateMe)
router.route('/:id').get(getWallet)

export default router
