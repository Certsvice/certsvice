import { Student } from './student.model'
import express from 'express'

// GET /api/student/:id — single certificate by mongo _id
export const getOne = async (req: express.Request, res: express.Response) => {
  try {
    const doc = await Student.findById(req.params.id)
      .populate({ path: 'issuer', populate: { path: 'owner' } })
      .exec()

    if (!doc) {
      return res.status(404).json({ message: 'Certificate not found' })
    }
    return res.status(200).json(doc)
  } catch (e) {
    console.error('[getOne student]', e)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// POST /api/student/:id — list certificates by issuer wallet _id, filtered by year
export const getMany = async (req: express.Request, res: express.Response) => {
  try {
    const issuerId = req.params.id
    const year = parseInt(req.body.year, 10)

    if (isNaN(year)) {
      return res.status(400).json({ message: 'year must be a number' })
    }

    const startOfYear = new Date(year, 0, 1)       // Jan 1 of year
    const startOfNext = new Date(year + 1, 0, 1)   // Jan 1 of year+1

    const docs = await Student.find({
      issuer: issuerId,
      createdAt: { $gte: startOfYear, $lt: startOfNext },
    })
      .populate({ path: 'issuer', populate: { path: 'owner' } })
      .exec()

    return res.status(200).json(docs)
  } catch (e) {
    console.error('[getMany student]', e)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// POST /api/student — create a new certificate record
export const createOne = async (req: express.Request, res: express.Response) => {
  try {
    const { data, certificateId, _id: issuer } = req.body

    if (!data || !certificateId || !issuer) {
      return res.status(400).json({ message: 'data, certificateId and _id (issuer) are required' })
    }

    const doc = await Student.create({ data, certificateId, issuer })
    return res.status(201).json(doc)
  } catch (e) {
    console.error('[createOne student]', e)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// DELETE /api/student/:id — remove a certificate by mongo _id
export const deleteOne = async (req: express.Request, res: express.Response) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id).exec()
    if (!result) {
      return res.status(404).json({ message: 'Certificate not found' })
    }
    return res.status(200).json({ message: 'Deleted' })
  } catch (e) {
    console.error('[deleteOne student]', e)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
