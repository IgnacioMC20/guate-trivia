import { Menu } from '@mui/icons-material'
import { AppBar, Box, Toolbar, Button, Avatar, Typography, IconButton } from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { links } from '@/utils'
import { UIContext } from '@/context'

import logoImage from '/public/logo.png'

interface ButtonLinkProps {
    href: string
    children: React.ReactNode
    pathname: string
}

const ButtonLink = ({ href, children, pathname }: ButtonLinkProps) => {
    return (
        <Button
            component={NextLink}
            href={href}
            color={pathname === href ? 'info' : 'secondary'}
            passHref
            sx={{
                border: `1px solid ${pathname === href ? '#fff' : '#000'}`,
            }}
        >
            {children}
        </Button>
    )
}

export const Navbar = () => {
    const { toggleSideMenu } = useContext(UIContext)
    const router = useRouter()
    // console.log(router)

    return (
        <AppBar sx={{ backgroundColor: '#A0C4FF', height: '110px' }} position="static">
            <Toolbar sx={{ height: '100%' }}>
                {/* Logo  */}
                <Image
                    src={logoImage}
                    alt="Logo Guate-Trivia"
                    width={100}
                    height={100}
                />

                {/* Links */}
                <Box sx={{ margin: '0 0 0 1.5rem', display: { xs: 'none', sm: 'flex' } }}>
                    {
                        links.map(({ href, label }) => (
                            <ButtonLink
                                key={href}
                                href={href}
                                pathname={router.pathname}
                            >
                                <Typography fontSize={20} fontWeight={'bold'}>
                                    {label}
                                </Typography>
                            </ButtonLink>
                        ))
                    }
                </Box>

                <Box flex={1} />

                {/* Menu para pantallas chiquitas */}
                <IconButton sx={{ display: { xs: '', sm: 'none' } }} onClick={toggleSideMenu}>
                    <Menu />
                </IconButton>

                {/* Avatar */}
                <Avatar
                    sx={{
                        width: { xs: 50, sm: 75 },
                        height: { xs: 50, sm: 75 },
                        backgroundColor: '#fdc500', // Color de fondo similar a Google
                        fontSize: '1.5rem', // Tamaño de la letra
                        fontWeight: 'bold', // Estilo de la letra
                        marginRight: '1rem', // Margen izquierdo
                    }}
                >
                    G
                </Avatar>
            </Toolbar>
        </AppBar>
    )
}
