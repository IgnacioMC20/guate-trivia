import type { NextApiRequest, NextApiResponse } from 'next'
import { ErrorResponse, Resend } from 'resend'
import { CreateEmailResponseSuccess } from 'resend/build/src/emails/interfaces'

import { EmailTemplate } from '@/emails/EmailTemplate'

type ResponseData = {
  message?: CreateEmailResponseSuccess | null | string
  error?: ErrorResponse
}
const resend = new Resend(process.env.RESEND_API_KEY)
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { data, error } = await resend.emails.send({
    from: 'ignacio.martinez@galileo.edu',
    to: 'jm10cuyun@gmail.com',
    subject: 'Guate Trivia',
    react: EmailTemplate({ firstName: 'Ign' }),
  })

  if (error) {
    return res.json({ error })
  }

  return res.json({message: data})
}

