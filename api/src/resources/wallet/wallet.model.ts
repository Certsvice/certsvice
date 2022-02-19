import mongoose from 'mongoose'
// import bcrypt from 'bcryptjs'

const walletSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'university',
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
walletSchema.index({ address: 1 })

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

export const Wallet = mongoose.model('wallet', walletSchema)
