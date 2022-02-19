import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
  {
    data: {
      type: {},
      required: true,
    },
    issuer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'wallet',
      required: true,
    },
    transcript: {
      type: [{}],
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
