import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  posts: {
    type: Array,
    default: [],
  },
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      return next()
    })
  })
})

userSchema.methods.comparePassword = async function (candidatePassword, cb) {
  await bcrypt.compare(candidatePassword, this.password, (err, same) => cb(err, same))
}

export default mongoose.model('User', userSchema, 'users')
