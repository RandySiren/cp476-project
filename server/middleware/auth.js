import jwt from 'jsonwebtoken'

const SECRET = 'ABCDXYZ'

const auth = async (req, res, next) => {
  try {
    // Split 'Bearer <token>' string to get token
    const token = req.headers.authorization.split(' ')[1]
    req.userId = jwt.verify(token, SECRET)
    next()
  } catch (err) {
    return res.sendStatus(401)
  }
}

export default auth
