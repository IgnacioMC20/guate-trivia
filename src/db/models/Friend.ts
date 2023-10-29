import mongoose, { model, Schema, Model } from 'mongoose'

import { IFriend } from '@/interfaces'

const friendSchema = new Schema({
  user_id_1: { type: String, required: true },
  user_id_2: { type: String, required: true, unique: true },
}, {
  timestamps: true
})

const Friend: Model<IFriend> = mongoose.models.Friend || model('Friend', friendSchema)

export default Friend
