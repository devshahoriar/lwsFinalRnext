import mongoose from 'mongoose'

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
    },
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Please provide an email'],
    },
    image: String,
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.User || mongoose.model('User', User)
