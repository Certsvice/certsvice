import { University } from './university.model'

export const getUniversity = async (req, res) => {
  const university = await University.find()
  if (!university) {
    return res.status(404).end()
  }
  res.status(200).json({ data: university })
}

// export const updateMe = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.user._id, req.body, {
//       new: true,
//     })
//       .lean()
//       .exec()

//     res.status(200).json({ data: user })
//   } catch (e) {
//     console.error(e)
//     res.status(400).end()
//   }
// }
