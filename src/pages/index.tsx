import { Grid, Typography } from '@mui/material'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

import { Userbar, TrophyModal } from '@/components'
import { MainLayout } from '@/layout'

export default function Home() {

    useEffect(() => {
        if (Cookies.get('lastQuestion')) return
        Cookies.set('lastQuestion', '1')
    }, [])

    const lastQuestion = Cookies.get('lastQuestion') || '1'

    return (
        <MainLayout title='Dashboard' pageDescription='Dashboard'>
            <Grid container sx={{ height: { xs: 'auto', sm: 'calc(100vh - 130px)' } }}>
                <Grid container height={{ xs: 'auto', sm: '20%' }} >
                    <Userbar />
                </Grid>
                <Grid container sx={{ margin: { xs: '0px', sm: '0px' }, height: { xs: '100%', sm: '80%' } }}>            
                    <Grid item xs={12} sm={6} height={'100%'} sx={{ background: '#f7f9fc', borderRadius: '10px' }} marginBottom={2} padding={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                        
                        <Typography variant="h4" component="h2">
                            Jugar
                        </Typography>
                        <Link href={`/jugar/${lastQuestion}`} passHref>
                            <Image
                                priority
                                src={'/playbutton.png'}
                                alt={'Boton de play'}
                                width={220}
                                height={200}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto'
                                }}
                            />
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} height={'100%'} sx={{ background: '#f7f9fc', borderRadius: '10px' }} padding={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                        <Typography variant="h4" component="h2">
                            Mis Insignias
                        </Typography>
                        <Image
                            priority
                            src={'/trophy.png'}
                            alt={'Boton de play'}
                            width={220}
                            height={200}
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                marginBottom: '25px'
                            }}
                        />
                        <TrophyModal />
                    </Grid>
                </Grid>
            </Grid>
        </MainLayout>
    )
}