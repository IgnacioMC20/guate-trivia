import { AccountCircle, EmojiEvents } from '@mui/icons-material'
import { Card, Grid, Typography, Divider, InputLabel } from '@mui/material'
import { useContext } from 'react'

import { AuthContext } from '@/context'

export const Userbar = () => {
    const { user } = useContext(AuthContext)
    return (
        <Card sx={{ backgroundColor: '#9BF6FF', width: '100%', marginBottom: '10px' }}>
            <Grid container display={'flex'} sx={{ width: '100%', height: '100%' }}>
                <Grid item sm={6} xs={12} display={'flex'} flexDirection={'row'} >
                    <Grid item display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ width: '30%' }}>
                        <AccountCircle style={{ fontSize: 100 }} />
                        
                    </Grid>
                    <Grid item sx={{ width: '70%' }} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                        <Typography variant='h6' sx={{ fontSize: '1rem' }} textAlign={'start'} width={'100%'}><b>Nombre de usuario:</b> {user?.name}</Typography>
                        <Typography variant='h6' sx={{ fontSize: '1rem' }} textAlign={'start'} width={'100%'}><b>Correo:</b> {user?.email}</Typography>
                        <Typography variant='h6' sx={{ fontSize: '1rem' }} textAlign={'start'} width={'100%'}><b>Amigos:</b> 12</Typography>
                    </Grid>
                </Grid>
                <Grid item sm={6} xs={12} display={'flex'} alignItems={'center'} sx={{ justifyContent: { xs: 'center', sm: 'end' } }}>
                    <Grid item sx={{ display: 'flex', borderRadius: '5px', backgroundColor: '#FDFFB6', padding: '15px', alignItems: 'center', margin: { xs: '10px 0 10px 0', sm: '0 10px 0 0' } }}>
                        <EmojiEvents sx={{ fontSize: 64 }} />
                        <Divider orientation="vertical" flexItem sx={{ padding: '5px', marginRight: '15px' }} />
                        <InputLabel>2,000 pts.</InputLabel>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

