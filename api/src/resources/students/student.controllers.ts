import { dayjs } from '../../helpers/datetime'
import { Student } from './student.model'
import express from 'express'

export const getMany = async (req: express.Request, res: express.Response) => {
  try {
    const _id = req.params.id
    const year = req.body.year
    const docs = await Student.find({
      createdAt: {
        $gte: new Date(dayjs().year(year).startOf('year').format('DD/MM/YYYY')),
        $lte: new Date(
          dayjs()
            .year(year + 1)
            .startOf('year')
            .format('DD/MM/YYYY')
        ),
      },
      issuer: _id,
    }).populate({ path: 'issuer', populate: { path: 'owner' } })
    if (!docs) {
      return res.status(400).end()
    }
    res.status(200).json(docs)
  } catch (e) {
    return res.status(400).end()
  }
}

export const deleteOne = async (req: express.Request, res: express.Response) => {
  try {
    const _id = req.params.id
    const { deletedCount } = await Student.find({ _id }).deleteOne()
    console.log(deletedCount)
    if (!deletedCount) {
      return res.status(400).end()
    }
    res.status(200).end()
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const getOne = async (req: express.Request, res: express.Response) => {
  const _id = req.params.id
  try {
    const docs = await Student.findOne({ _id }).populate({ path: 'issuer', populate: { path: 'owner' } })
    if (!docs) {
      return res.status(400).end()
    }
    res.status(200).json(docs)
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const createOne = async (req: express.Request, res: express.Response) => {
  try {
    const doc = await Student.create({ data: req.body.data, certificateId: req.body.certificateId, issuer: req.body._id })
    if (!doc) {
      return res.status(400).end()
    }
    res.status(201).json(doc)
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

// overide
// export default {
//     ...crudControllers(Student),
//     getOne(){

//     }
// }
