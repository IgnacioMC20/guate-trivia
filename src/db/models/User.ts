import mongoose, { model, Schema, Model } from 'mongoose'

import { IUser } from '@/interfaces'

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  level: { type: Number, default: 1 },
  trophys: { type: Number, default: 1 },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, {
  timestamps: true
})

const User: Model<IUser> = mongoose.models.User || model('User', userSchema)

export default User