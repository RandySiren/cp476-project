import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const SECRET = 'ABCDXYZ'

export const getUserByID = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  if (!user) return res.status(400).json({ error: `No user found by ID: ${id}` })
  return res.status(200).json(user)
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email })
  if (!user) {
    return res.status(400).json({ error: 'Invalid login information' })
  }
  await user.comparePassword(password, (err, same) => {
    if (err) return res.status(400).json({ error: err })
    if (!same) return res.status(400).json({ error: 'Invalid login information' })
    const token = jwt.sign({ email: user.email, id: user._id }, SECRET, { expiresIn: '6h' })
    return res.status(200).json({ result: user, token })
  })
}

export const signup = async (req, res) => {
  const { email, password, name } = req.body
  const user = new User({ email, password, name })
  user.save((err, doc) => {
    if (err) {
      return res.status(400).json({ error: err })
    }
    const token = jwt.sign({ email: doc.email, id: doc._id }, SECRET, { expiresIn: '6h' })
    return res.status(201).json({ result: doc, token })
  })
}
