import { Menu } from '@mui/icons-material'
import { AppBar, Box, Toolbar, Button, Typography, IconButton } from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { images, links } from '@/utils'
import { AuthContext, UIContext } from '@/context'

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
            color={
                (pathname === href) ? 'info' :
                    (pathname.includes('/jugar/') && href.includes('jugar')) ? 'info' : 'secondary'

            }
            passHref
            sx={{
                border: `1px solid ${pathname === href ? '#fff' : '#000'}`,
                margin: '0 0.5rem'
            }}
        >
            {children}
        </Button>
    )
}

export const Navbar = () => {
    const { toggleSideMenu } = useContext(UIContext)
    const { user } = useContext(AuthContext)
    const userImage = images.find(image => image.id === parseInt(user?.avatar!))?.src
    const router = useRouter()

    return (
        <AppBar sx={{ backgroundColor: '#A0C4FF', height: '110px' }} position="static">
            <Toolbar sx={{ height: '100%' }}>
                {/* Logo  */}
                <Image
                    priority
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

                {/* Avatar */}
                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    {
                        userImage && router.pathname !== '/' && (
                            <Image
                                priority
                                src={userImage}
                                width={75}
                                height={75}
                                alt={`Image ${user?.avatar!}`}
                                className="user-image"
                                style={{ borderRadius: '50%' }}
                            />
                        )
                    }
                </Box>
                <IconButton onClick={toggleSideMenu}>
                    <Menu sx={{ fontSize: 45 }} />
                </IconButton>

            </Toolbar>
        </AppBar>
    )
}
