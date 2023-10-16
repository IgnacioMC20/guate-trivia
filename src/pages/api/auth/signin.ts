import type { NextApiRequest, NextApiResponse } from 'next'

// import User from '../../../db/models/User'
import { db } from '@/db'
// import InitUser from '@/db/models/User'
import { User } from '@/db/models'
import { IUser } from '@/interfaces'

type Data = { message: any | string }

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {

  if (req.method !== 'POST') {
    throw new Error('Metodo no aceptado')
  }

  try {

    const { name: username, email, password, avatar } = req.body

    console.log(username)
    // await db.connect()
    // Create a new user in the database
    const newUser = await User.create({
      username,
      email,
      password,
      avatar,
    })

    // await db.disconnect()

    // Return a response with the new user
    // return res.status(201).json({ message: newUser })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: `Error creating the user ${error}` })
  }
}