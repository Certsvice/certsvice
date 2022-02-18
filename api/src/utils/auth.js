import config from '../config'
import { University } from '../resources/universities/university.model'
import jwt from 'jsonwebtoken'

export const newToken = (university) => {
  return jwt.sign({ id: university._id }, config.secrets.jwt, {
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
  if (!req.body.address || !req.body.universityName) {
    return res
      .status(400)
      .send({ message: 'Address and University Name required' })
  }
  try {
    const university = await University.create(req.body)
    const token = newToken(university)
    return res.status(200).send({ token })
  } catch (e) {
    console.log(e)
    return res.status(400).end()
  }
}

export const signin = async (req, res) => {
  if (!req.body.address || !req.body.universityName) {
    return res
      .status(400)
      .send({ message: 'Address and University Name required' })
  }

  try {
    const university = await University.findOne({
      address: req.body.address,
    }).exec()
    console.log(university)
    if (!university) {
      return res
        .status(401)
        .send({ message: 'Invalid university name and address combination' })
    }
    // const match = await university.checkPassword(req.body.universityName)
    // if (!match) {
    //   return res.status(401).send({ message: 'Not auth' })
    // }
    const token = newToken(university)
    return res.status(201).send({ token })
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
  const university = await University.findById(payload.id)
    .select('-universityName')
    .lean()
    .exec()
  if (!university) {
    return res.status(401).end()
  }
  req.address = university
  next()
}
