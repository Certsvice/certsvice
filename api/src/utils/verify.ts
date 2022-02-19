import { Wallet } from '../resources/wallet/wallet.model'
export const verifyStatus = async (req, res) => {
  console.log(req.params.address)
  const check = await Wallet.findOne({ address: req.params.address }).lean().exec()
  if (check) {
    return res.status(200).send({ status: check.verify })
  } else {
    return res.status(200).send({ status: 'notFound' })
  }
}
