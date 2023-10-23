import bcrypt from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/db'
import { User } from '@/db/models'
import { jwt, validations } from '@/utils'
import { isValidPassword } from '@/utils/validations'
// import User from '../../../db/models/User'
// import InitUser from '@/db/models/User'
// import { IUser } from '@/interfaces'

type Data = { message: string } | { token: string, user: any }

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {

  if (req.method !== 'POST') {
    throw new Error('Metodo no aceptado')
  }
  registerUser(req, res)
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { email = '', password = '', name = '', avatar = '' } = req.body as { email: string, password: string, name: string, avatar: string }
  if (!isValidPassword(password)) {
    return res.status(400).json({
      message: 'La contraseña no es valida'
    })
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({
      message: 'El correo no tiene formato de correo'
    })
  }

  await db.connect()
  const user = await User.findOne({ email })

  if (user) {
    return res.status(400).json({
      message: 'El correo ya esta registrado'
    })
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    name,
    avatar
  })

  try {
    await newUser.save({ validateBeforeSave: true })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Revisar logs del servidor'
    })
  }

  const { _id, } = newUser

  const token = jwt.signToken(_id, email)

  return res.status(200).json({
    token, //jwt
    user: {
      email, name, avatar
    }
  })

}