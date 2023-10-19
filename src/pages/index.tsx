import { Button, Card, CardActionArea, Grid, Typography } from '@mui/material'

import { Navbar } from '@/components'
import { MainLayout } from '@/layout'

export default function Home() {
  {/* Dashboard */ }
  return (
    <MainLayout title='Dashboard' pageDescription='Dashboard'>
      <Navbar />
      <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
        <Grid item>
          <Card>
            <CardActionArea>
              <Typography variant='h1'>Dashboard</Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <Grid container display={'flex'} justifyContent={'center'}
              sx={{ height: '100%', border: '1px solid red' }}
            >
              <Grid item sx={{ border: '1px solid black' }}>
                <CardActionArea>
                  <Typography variant='h1'>Dashboard</Typography>
                </CardActionArea>
              </Grid>
              <Grid item sx={{ border: '1px solid black' }}>
                <Button size="large">Large</Button>
                <Typography variant='h1'>Dashboard</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

    </MainLayout>
  )
}
