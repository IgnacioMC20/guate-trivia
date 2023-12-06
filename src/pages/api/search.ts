import type { NextApiRequest, NextApiResponse } from 'next'

import { User } from '@/db/models'
import { UserProfile } from '@/interfaces'

type Data = { success: boolean, error?: string, message: string, users?: UserProfile[] }

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== 'GET') {
        return res.status(403).json({ success: false, message: 'Método no permitido' })
    }

    const searchText = req.query.s || ''

    try {
        if (typeof searchText !== 'string' || searchText.trim() === '') {
            return res.status(400).json({ success: false, users: [], message: 'Ingrese un término de búsqueda válido' })
        }

        const users = await User.find({
            $or: [
                { name: { $regex: searchText, $options: 'i' } },
                { email: { $regex: searchText, $options: 'i' } },
            ],
        })

        if (!Array.isArray(users) || users.length === 0) {
            return res.status(200).json({ success: false, users: [], message: 'No se encontraron usuarios' })
        }

        const userFiltered = users.map(({
            name,
            email,
            _id,
            avatar,
            level,
            trophys,
        }) => {
            return {
                name,
                email,
                id: JSON.parse(JSON.stringify(_id)),
                avatar,
                level,
                trophys,
            }
        })

        res.status(200).json({ success: true, message: 'Búsqueda exitosa', users: userFiltered })
    } catch (error: any) {
        // console.error(error)
        res.status(500).json({ success: false, error, message: 'Error al buscar usuarios' })
    }
}
