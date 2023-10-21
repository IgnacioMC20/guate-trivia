import Grid from '@mui/material/Grid'
import Image from 'next/image'
import Link from 'next/link'

import { Userbar } from '@/components/Userbar'
import { MainLayout } from '@/layout'
import { dashboardImages } from '@/utils'

export default function Home() {
    return (
        <MainLayout title='Dashboard' pageDescription='Dashboard'>
            <Grid container sx={{ height: { xs: 'auto', sm: 'calc(100vh - 130px)' } }}>
                <Grid container height={{ xs: 'auto', sm: '20%' }} >
                    <Userbar />
                </Grid>
                <Grid container sx={{ margin: { xs: '5px', sm: '0px' }, height: {xs: 'auto', sm: '80%'} }} >
                    {
                        dashboardImages.map(({ src, alt, href, color }, index) => (
                            <Grid key={index} item xs={12} sm={6} height={'100%'} sx={{ background: color, borderRadius: '10px' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                <Link href={href || '/'} passHref>
                                    <Image
                                        src={src}
                                        alt={alt}
                                        width={100}
                                        height={100}
                                    layout="responsive"
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
