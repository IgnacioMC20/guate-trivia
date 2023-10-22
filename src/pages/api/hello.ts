// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/db'

type Data = {
  name: string
} | { message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(process.env.MONGO_URL)
  if (req.method === 'GET') return res.status(403).json({ message: 'no tiene permiso para entrar' })
  await db.connect()
  await db.disconnect()
  res.status(200).json({ name: 'guate trivia' })
}
