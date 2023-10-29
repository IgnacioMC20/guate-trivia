import { Card, Grid, Typography } from '@mui/material'

import { MainLayout } from '@/layout'

interface Props {
    message: string
}

export const NoQuestion = ({ message }: Props) => {
    return (
        <MainLayout pageDescription='Jugar' title='Jugar'>
            <Grid container sx={{ height: { xs: 'auto', sm: 'calc(100vh - 130px)' }, padding: { xs: '50px 10px', sm: '50px 200px' } }}>
                <Grid item xs={12} sx={{ height: '100%' }} display={'flex'} justifyContent={'center'}>
                    <fieldset style={{ background: '#FDFFB6', height: '100%', display: 'flex', flexWrap: 'wrap' }}>
                        <legend>Guate-Trivia</legend>
                        <Card sx={{ background: 'transparent', boxShadow: 'none', padding: { xs: '', sm: '50px' }, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Grid container sx={{ height: '100%' }}>
                                <Typography variant='h6'>
                                    {message}
                                </Typography>
                            </Grid>
                        </Card>
                    </fieldset>
                </Grid>
            </Grid>
        </MainLayout>
    )
}
