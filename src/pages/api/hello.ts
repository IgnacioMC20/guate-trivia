// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
} | { message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') return res.status(403).json({ message: 'no tiene permiso para entrar' })
  res.status(200).json({ name: 'guate trivia' })
}
