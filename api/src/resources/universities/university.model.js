import mongoose from 'mongoose'
// import bcrypt from 'bcryptjs'

const universitySchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    universityName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
)
universitySchema.index({ address: 1 })

// universitySchema.pre('save', function (next) {
//   if (!this.isModified('universityName')) {
//     return next()
//   }

//   bcrypt.hash(this.universityName, 8, (err, hash) => {
//     if (err) {
//       return next(err)
//     }

//     this.universityName = hash
//     next()
//   })
// })

// universitySchema.methods.checkPassword = function (universityname) {
//   const universityNameHash = this.universityName
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(universityname, universityNameHash, (err, same) => {
//       if (err) {
//         return reject(err)
//       }

//       resolve(same)
//     })
//   })
// }

export const University = mongoose.model('university', universitySchema)
