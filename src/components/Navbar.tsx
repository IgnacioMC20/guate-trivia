import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export const Navbar = () => {
    const router = useRouter()

    return (
        <AppBar sx={{ backgroundColor: '#A0C4FF'}}>
            <Toolbar>
                <NextLink href={'/'} passHref legacyBehavior>
                    <Link display={'flex'} alignItems={'center'}>
                        <Typography variant='h6'>Guate Trivia</Typography>
                    </Link>
                </NextLink>

                <Box flex={1} />

            </Toolbar>
        </AppBar>
    )
}
