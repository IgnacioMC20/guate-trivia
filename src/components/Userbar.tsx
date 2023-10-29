import { AccountCircle } from '@mui/icons-material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { Card, Grid, Typography } from '@mui/material'
import { Divider } from '@mui/material'
import { InputLabel } from '@mui/material'
import React from 'react'

export const Userbar = () => {
    return (
        <Card sx={{ backgroundColor: '#9BF6FF', width: '100%', marginBottom: '10px' }}>
            <Grid container display={'flex'} sx={{ width: '100%', height: '100%' }}>
                <Grid item sm={6} xs={12} display={'flex'} flexDirection={'row'} >
                    <Grid item display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ width: '30%' }}>
                        <AccountCircle style={{ fontSize: 100 }} />
                    </Grid>
                    <Grid item sx={{ width: '70%' }} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                        <Typography variant='h6' sx={{ fontSize: '1rem' }} textAlign={'start'} width={'100%'}>Nombre de usuario: username</Typography>
                        <Typography variant='h6' sx={{ fontSize: '1rem' }} textAlign={'start'} width={'100%'}>Correo: asdf@gmail.com</Typography>
                        <Typography variant='h6' sx={{ fontSize: '1rem' }} textAlign={'start'} width={'100%'}>Amigos: 12</Typography>
                    </Grid>
                </Grid>
                <Grid item sm={6} xs={12} display={'flex'} alignItems={'center'} sx={{ justifyContent: { xs: 'center', sm: 'end' } }}>
                    <Grid item sx={{ display: 'flex', borderRadius: '5px', backgroundColor: '#FDFFB6', padding: '15px', alignItems: 'center', margin: { xs: '10px 0 10px 0', sm: '0 10px 0 0' } }}>
                        <EmojiEventsIcon sx={{ fontSize: 64 }}/>
                        <Divider orientation="vertical" flexItem sx={{ padding: '5px', marginRight: '15px' }} />
                        <InputLabel>2,000 pts.</InputLabel>                        
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

