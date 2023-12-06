import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/db'
import { Friend, User } from '@/db/models'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const createFriend = async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const { user_id_1, user_id_2 } = req.body

            if (!user_id_1 || !user_id_2) {
            
                return res.status(200).json({ success: false, message: 'Los IDs de usuarios son requeridos' })
            }
            
            if (user_id_1 === user_id_2) {
                return res.status(200).json({ success: false, message: 'No puedes agregarte como amigo a ti mismo' })
            }
            
            await db.connect()
            
            // Verificar si ya son amigos
            const existingFriend = await Friend.findOne({ $or: [{ user_id_1, user_id_2 }, { user_id_1: user_id_2, user_id_2: user_id_1 }] })
            
            if (existingFriend) {
                await db.disconnect()
                return res.status(200).json({ success: false, message: '¡Ya son amigos!' })
            }

            const friend = new Friend({
                user_id_1,
                user_id_2,
            })

            await db.connect()
            await friend.save()
            await db.disconnect()

            res.status(201).json({ success: true, message: 'Amigo agregado' })
        } catch (error) {
            res.status(500).json({ success: false, error: error })
        }
    }

    const getFriends = async (req: NextApiRequest, res: NextApiResponse) => {
        const { userId } = req.query
    
        try {
            if (!userId || typeof userId !== 'string') {
                return res.status(400).json({ success: false, message: 'ID de usuario inválido' })
            }
    
            await db.connect()
    
            const friends = await Friend.find({
                $or: [{ user_id_1: userId }, { user_id_2: userId }],
            })
    
            if (!Array.isArray(friends) || friends.length === 0) {
                await db.disconnect()
                return res.status(200).json({ success: false, message: 'No se encontraron amigos' })
            }
    
            const friendIds = friends
                .map((friend) => [friend.user_id_1, friend.user_id_2])
                .flat()
                .filter((friendId) => friendId !== userId) // Excluir el ID del usuario actual
    
            const usersArray = await User.find({ _id: { $in: friendIds } })
    
            await db.disconnect()
    
            if (!Array.isArray(usersArray) || usersArray.length === 0) {
                return res.status(200).json({ success: false, message: 'No se encontraron usuarios' })
            }
    
            const usersArrayFiltered = usersArray.map(({ _id, name, email, trophys, level, avatar }) => {
                return { id: _id, name, email, trophys, level, avatar }
            })
    
            console.log('usersArray', usersArrayFiltered)
    
            res.status(200).json({ success: true, data: { usersArrayFiltered, friendIds } })
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message, data: { usersArrayFiltered: [], friendIds: [] } })
        }
    }
    
    switch (req.method) {
        case 'GET':
            return getFriends(req, res)
        case 'POST':
            return createFriend(req, res)
        default:
            return res.status(405).json({ success: false, message: 'Method not allowed' })
    }

}
