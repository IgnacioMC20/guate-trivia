import { isValidObjectId } from 'mongoose'

import { db } from '.'
import { User } from '@/db/models'

export const getUser = async (id: string) => {
  if (!isValidObjectId(id)) return null
  await db.connect()
  const user = await User.findById(id)
  await db.disconnect()

  if (!user) {
    return null
  }

  return user.toJSON()
}
