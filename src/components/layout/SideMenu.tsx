import { Logout } from '@mui/icons-material'
import {
    Avatar,
    Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { AuthContext, UIContext } from '@/context'
import { images, links } from '@/utils'

export const SideMenu = () => {

    const { isMenuOpen, toggleSideMenu } = useContext(UIContext)
    const { user, logout } = useContext(AuthContext)
    const router = useRouter()
    const userImage = images.find(image => image.id === parseInt(user?.avatar!))?.src || images[0].src

    const navigateTo = (url: string) => {
        toggleSideMenu()
        router.push(url)
    }

    return (
        <Drawer
            open={isMenuOpen}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={toggleSideMenu}
        >
            <Box sx={{ width: 300, paddingTop: 5, height: '100%' }}>
                <Box display={'flex'} justifyContent={'center'} sx={{ padding: 5 }}>
                    <Avatar
                        sx={{
                            width: { xs: 120, md: 75 },
                            height: { xs: 120, md: 75 },
                            display: { xs: 'flex', md: 'none' }, // Ocultar en pantallas grandes
                        }}
                    >
                        <Image priority src={userImage} width={120} height={120} alt={`Image ${user?.avatar!}`} style={{ borderRadius: '50%' }} />
                    </Avatar>
                </Box>
                <List >
                    {
                        links.map(({ href, label, icon }) => (
                            <ListItemButton
                                key={href}
                                onClick={() => navigateTo(href)}
                                sx={{
                                    display: {
                                        xs: '', md: 'none'
                                    }
                                }}
                            >
                                <ListItemIcon>
                                    {/* <Icon /> */}
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={label} />
                            </ListItemButton>
                        ))
                    }
                    <ListItemButton
                        onClick={logout}
                    >
                        <ListItemIcon>
                            {/* <Icon /> */}
                           <Logout/>
                        </ListItemIcon>
                        <ListItemText primary={'Salir'} />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer >
    )
}