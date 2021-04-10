import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    trim: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true,
      },
      authorName: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      content: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
})

export default mongoose.model('Post', postSchema, 'posts')
