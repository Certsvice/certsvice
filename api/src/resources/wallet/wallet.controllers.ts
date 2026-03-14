import express from 'express'
import { Wallet } from './wallet.model'

export const getWallets = async (req: express.Request, res: express.Response) => {
  try {
    const data = await Wallet.find().populate('owner').exec()
    return res.status(200).json(data)
  } catch (e) {
    console.error('[getWallets]', e)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getWallet = async (req: express.Request, res: express.Response) => {
  try {
    // Try by wallet _id first (detail page), then by owner _id (university lookup from Web3)
    const data =
      (await Wallet.findById(req.params.id).populate('owner').exec()) ??
      (await Wallet.findOne({ owner: req.params.id }).populate('owner').exec())
    if (!data) {
      return res.status(404).json({ message: 'Wallet not found' })
    }
    return res.status(200).json(data)
  } catch (e) {
    console.error('[getWallet]', e)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
