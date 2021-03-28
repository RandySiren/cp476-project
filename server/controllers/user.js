import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const SECRET = 'ABCDXYZ'

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email })
  await user.comparePassword(password, (err, same) => {
    if (err) return res.status(400).json({ error: err })
    if (!same) return res.status(400).json({ error: 'Invalid password' })
    const token = jwt.sign({ email: user.email, id: user._id }, SECRET, { expiresIn: '6h' })
    return res.status(200).json({ result: user, token })
  })
}

export const signup = async (req, res) => {
  const { email, password, name } = req.body
  const user = new User({ email, password, name })
  await user.save((err, doc) => {
    if (err) {
      return res.status(400).json({ error: err })
    }
    const token = jwt.sign({ email: doc.email, id: doc._id }, SECRET, { expiresIn: '6h' })
    return res.status(201).json({ result: doc, token })
  })
}
