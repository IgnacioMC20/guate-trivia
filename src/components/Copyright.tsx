import { Typography } from '@mui/material'
import Link from 'next/link'

function Copyright(props: any) {

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                GuateTrivia
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}