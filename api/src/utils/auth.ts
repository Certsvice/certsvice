import config from '../config'
import { Wallet } from '../resources/wallet/wallet.model'
import jwt from 'jsonwebtoken'

export const newToken = (wallet) => {
  return jwt.sign({ id: wallet._id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  })
}

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  if (!req.body.address || !req.body.owner) {
    return res.status(400).send({ message: 'Address and University required' })
  }
  const check = await Wallet.findOne({ address: req.body.address }).lean().exec()

  try {
    if (!check) {
      const wallet = await Wallet.create(req.body)
      return res.status(201).send({ wallet })
    } else {
      res.status(400).send({ message: 'Your Address already use' })
    }
  } catch (e) {
    console.log(e)
    return res.status(400).end()
  }
}

export const signin = async (req, res) => {
  console.log(req.body)
  if (!req.body.address) {
    return res.status(400).send({ message: 'Address required' })
  }

  try {
    const wallet = await Wallet.findOne({
      address: req.body.address,
    }).exec()
    if (!wallet) {
      return res.status(401).send({ message: 'Invalid address' })
    }
    // const match = await university.checkPassword(req.body.universityName)
    // if (!match) {
    //   return res.status(401).send({ message: 'Not auth' })
    // }
    const token = newToken(wallet)
    return res.status(200).send({ token })
  } catch (e) {
    console.log(e)
    return res.status(500).end()
  }
}

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }
  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }
  const wallet = await Wallet.findById(payload.id).select('-owner').lean().exec()
  if (!wallet) {
    return res.status(401).end()
  }
  req.address = wallet
  next()
}
