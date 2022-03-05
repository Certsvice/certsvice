import { University } from './university.model'
import express from 'express'

export const getMany = async (req: express.Request, res: express.Response) => {
  try {
    const docs = await University.find().lean().exec()
    if (!docs) {
      return res.status(400).end()
    }
    res.status(200).json(docs)
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}
