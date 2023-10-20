import { AppBar, Box, Link, Toolbar, Typography, Button } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export const Navbar = () => {

    return (
        <AppBar sx={{ backgroundColor: '#A0C4FF' }}>
            <Toolbar>
                <Button variant='outlined' component={NextLink} href='/main/dashboard'>
                    Inicio
                </Button>
                <Button variant='outlined' component={NextLink} href='/amigos'>
                    Amigos
                </Button>

                <Box flex={1} />

            </Toolbar>
        </AppBar>
    )
}
