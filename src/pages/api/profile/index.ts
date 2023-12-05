import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/db'
import { User } from '@/db/models'
import { UserProfile } from '@/interfaces'

type Data = { userProfile: UserProfile } | { message: string }

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {

    if (req.method !== 'POST') {
        throw new Error('Metodo no aceptado')
    }

    try {
        const { id = '' } = req.body

        await db.connect()
        const user = await User.findById(id)
        await db.disconnect()

        if (!user) {
            return res.status(404).json({ message: 'Tenemos problemas para encontrar este usuario' })
        }

        const { name, avatar, email, level, trophys } = user

        return res.status(200).json({
            userProfile: {
                email, name, avatar, level, trophys, id: JSON.parse(JSON.stringify(user?.id))
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error en el servidor' })

    }

}
