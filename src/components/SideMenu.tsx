import {
    Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { UIContext } from '@/context'
import { links } from '@/utils'

export const SideMenu = () => {

    const { isMenuOpen, toggleSideMenu } = useContext(UIContext)
    const router = useRouter()
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
                <List >
                    {
                        links.map(({ href, label, icon }) => (
                            <ListItemButton
                                key={href}
                                onClick={() => navigateTo(href)}
                                sx={{
                                    display: {
                                        xs: '', sm: 'none'
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
                </List>
            </Box>
        </Drawer >
    )
}