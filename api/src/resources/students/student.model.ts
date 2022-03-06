import mongoose from 'mongoose'
import { Certificate, TranscriptEntity } from '../../types'
const studentSchema = new mongoose.Schema(
  {
    data: {
      type: mongoose.SchemaTypes.Mixed,
      // {
      //   // name: String,
      //   // university: String,
      //   // studentId: String,
      //   // identificationNumber: String,
      //   // addmissionDate: String,
      //   // graduationDate: String,
      //   // program: String,
      //   // faculty: String,
      //   // degree: String,
      //   // degreeName: String,
      //   // issuedOn: String,
      //   // transcript: { name: String, semester: String, creditsEarned: Number, totalCreditEarned: Number, gpa: Number, gpax: Number },
      // },
      required: true,
    },
    certificateId: {
      type: String,
      require: true,
    },
    issuer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'wallet',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
studentSchema.index({ issuer: 1 })
export const Student = mongoose.model('student', studentSchema)

// export const getMany = (model) => async (req, res) => {
//   try {
//     const docs = await model.find({ issuer: req.address._id }).lean().exec()
//     if (!docs) {
//       return res.ststus(400).end()
//     }
//     res.status(200).json({ data: docs })
//   } catch (e) {
//     console.error(e)
//     res.status(400).end()
//   }
// }
