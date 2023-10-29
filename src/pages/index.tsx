import { Grid } from '@mui/material'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

import { Userbar } from '@/components'
import { MainLayout } from '@/layout'
import { dashboardImages } from '@/utils'

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
                <Grid container sx={{ margin: { xs: '5px', sm: '0px' }, height: { xs: 'auto', sm: '80%' } }} spacing={4}>
                    {
                        dashboardImages.map(({ src, alt, href, color }, index) => (
                            <Grid key={index} item xs={12} sm={6} height={'100%'} sx={{ background: color, borderRadius: '10px' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                <Link href={href ? `${href}/${lastQuestion}` : '/'} passHref>
                                    <Image
                                        priority
                                        src={src}
                                        alt={alt}
                                        width={220}
                                        height={200}
                                        style={{
                                            maxWidth: '100%',
                                            height: 'auto'
                                        }}
                                    />
                                </Link>
                            </Grid>
                        )
                        )
                    }
                </Grid>
            </Grid>
        </MainLayout>
    )
}
