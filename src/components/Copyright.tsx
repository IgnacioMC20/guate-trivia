import { Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export const Copyright = () => {
    return (
        <Typography variant='body2' color='text.secondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='/'>
                GuateTrivia
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}
