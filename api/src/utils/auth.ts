import config from '../config'
import { Wallet } from '../resources/wallet/wallet.model'
import { University } from '../resources/universities/university.model'
import jwt from 'jsonwebtoken'
import express from 'express'

// ─── Token helpers ───────────────────────────────────────────────────────────

export const newToken = (walletId: string) =>
  jwt.sign({ id: walletId }, config.secrets.jwt as string, {
    expiresIn: config.secrets.jwtExp,
  })

export const verifyToken = (token: string): Promise<jwt.JwtPayload> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt as string, (err, payload) => {
      if (err) return reject(err)
      resolve(payload as jwt.JwtPayload)
    })
  })

// ─── Signup ───────────────────────────────────────────────────────────────────
// POST /api/signup — registers a wallet address and links it to a university

export const signup = async (req: express.Request, res: express.Response) => {
  const { address, owner } = req.body

  if (!address || !owner) {
    return res.status(400).json({ message: 'address and owner (university id) are required' })
  }

  try {
    const university = await University.findById(owner).lean().exec()
    if (!university) {
      return res.status(400).json({ message: 'University not found' })
    }

    const existing = await Wallet.findOne({ address }).lean().exec()
    if (existing) {
      return res.status(409).json({ message: 'This address is already registered' })
    }

    const wallet = await Wallet.create({ address, owner })
    return res.status(201).json({ wallet })
  } catch (e) {
    console.error('[signup]', e)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// ─── Signin ───────────────────────────────────────────────────────────────────
// POST /api/signin — returns a JWT for a registered wallet address

export const signin = async (req: express.Request, res: express.Response) => {
  const { address } = req.body

  if (!address) {
    return res.status(400).json({ message: 'address is required' })
  }

  try {
    const wallet = await Wallet.findOne({ address }).exec()
    if (!wallet) {
      return res.status(401).json({ message: 'Address not registered' })
    }

    const token = newToken(wallet._id.toString())
    return res.status(200).json({ token })
  } catch (e) {
    console.error('[signin]', e)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// ─── Protect middleware ───────────────────────────────────────────────────────
// Verifies the Bearer JWT and attaches the wallet to req.wallet

export const protect = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const bearer = req.headers.authorization

  if (!bearer?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const token = bearer.split('Bearer ')[1].trim()

  try {
    const payload = await verifyToken(token)
    const wallet = await Wallet.findById(payload.id).populate('owner').exec()
    if (!wallet) {
      return res.status(401).json({ message: 'Wallet not found' })
    }
    ;(req as any).wallet = wallet
    next()
  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
