import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
  {
    data: {
      type: {},
      required: true,
    },
    issuer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'university',
      required: true,
    },
    transcript: {
      type: [{}],
      required: true,
    },
  },
  { timestamps: true }
)
studentSchema.index({ issuer: 1 })
export const Student = mongoose.model('student', studentSchema)
