import mongoose from 'mongoose'
// import bcrypt from 'bcryptjs'
// a

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
  }
)
universitySchema.index({ code: 1 })

export const University = mongoose.model('university', universitySchema)

