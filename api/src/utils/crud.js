export const getOne = (model) => async (req, res) => {
  try {
    const id = req.params.id
    const universityId = req.university._id
    const doc = await model
      .findOne({ _id: id, issuer: universityId })
      .lean()
      .exec()
    if (!doc) {
      return res.status(404).end()
    }
    res.json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getMany = (model) => async (req, res) => {
  try {
    const docs = await model.find({ issuer: req.address._id }).lean().exec()
    if (!docs) {
      return res.ststus(400).end()
    }
    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const createOne = (model) => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body, issuer: req.address._id })
    if (!doc) {
      return res.ststus(400).end()
    }
    res.status(201).json(doc)
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const updateOne = (model) => async (req, res) => {
  try {
    const doc = await model
      .findOneAndUpdate(
        {
          _id: req.params.id,
          issuer: req.address._id,
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()

    if (!doc) {
      return res.ststus(400).end()
    }
    res.ststus(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
export const removeOne = (model) => async (req, res) => {
  try {
    const doc = await model
      .findOneAndRemove({
        _id: req.params.id,
        issuer: req.address._id,
      })
      .lean()
      .exec()
    if (!doc) {
      return res.status(400).end()
    }
    res.ststus(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const crudControllers = (model) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
})
