import { University } from './../universities/university.model';
import express from 'express'
import { Wallet } from './wallet.model'

export const getWallet = async (req: express.Request, res: express.Response) => {
  const data = await Wallet.find().select('-createdAt -updatedAt').populate('owner')
  if (!data) {
    return res.status(404).end()
  }
  res.status(200).json(data)
}

// export const updateMe = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.user._id, req.body, {
//       new: true,
//     })
//       .lean()
//       .exec()

//     res.status(200).json({ data: user })
//   } catch (e) {
//     console.error(e)
//     res.status(400).end()
//   }
// }
