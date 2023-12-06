import type { NextApiRequest, NextApiResponse } from 'next'

import { User } from '@/db/models'
import { UserProfile } from '@/interfaces'

type Data = { success: boolean, error?: string, message: string, users?: UserProfile[] }

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== 'GET') return res.status(403).json({ success: false, message: 'Metodo no permitido' })

    const searchText = req.query.s // Get the search text from the query string

    //search for users
    try {
        const users = await User.find({
            $or: [
                { name: { $regex: searchText, $options: 'i' } }, // Busca por nombre (case-insensitive)
                { email: { $regex: searchText, $options: 'i' } }, // Busca por email (case-insensitive)
            ],
        })

        if (users.length === 0) return res.status(200).json({ success: false, users: [], message: 'No se encontraron usuarios' })

        const userFiltered = users.map(({
            name,
            email,
            _id,
            avatar,
            level,
            trophys
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

        res.status(200).json({ success: true, message: 'Todo bien!', users: userFiltered })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ success: false, error, message: 'Error al buscar usuarios' })
    }
}