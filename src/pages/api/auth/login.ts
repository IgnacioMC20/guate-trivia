import bcrypt from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/db'
import { User } from '@/db/models'
import { jwt } from '@/utils'

type Data = { message: any } | { token: string, user: any }

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {

    if (req.method !== 'POST') {
        throw new Error('Metodo no aceptado')
    }

    try {
        const { email = '', password = '' } = req.body

        await db.connect()
        const user = await User.findOne({ email })
        await db.disconnect()

        if (!user) {
            return res.status(400).json({ message: 'Correo o contraseña no válidos' })
        }

        if (!bcrypt.compareSync(password, user.password!)) {
            return res.status(400).json({ message: 'Correo o contraseña no válidos' })
        }

        const { name, _id, avatar } = user

        const token = jwt.signToken(_id, email)

        return res.status(200).json({
            token, //jwt
            user: {
                email, name, avatar
            }
        })
    } catch (error) {
        //

    }

}
