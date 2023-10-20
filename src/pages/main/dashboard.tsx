import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import * as React from 'react'

import { Navbar } from '@/components'
import { Userbar } from '@/components/Userbar'
import { MainLayout } from '@/layout'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#FFC6FF' : '#BDB2FF',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))

const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#FDFFB6' : '#FFD6A5',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))

export default function Home() {

    return (
        <MainLayout title='Dashboard' pageDescription='Dashboard'>
            <Userbar />
            <br></br>
            
            <Box sx={{ flexGrow: 1, }} >
                <Grid container spacing={0.5} columns={16} >
                    <Grid item xs={8} sx={{borderStyle: 'solid'}}>
                        <Item>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <img
                                srcSet={`${'/jaguar.png'}`}
                                src={`${'/jaguar.png'}`}
                                width={220}
                                height={200}
                            />
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                        </Item>
                    </Grid>
                    <Grid item xs={8} sx={{borderStyle: 'solid'}}>
                        <Item2>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <img
                                srcSet={`${'/boton-de-play.png'}`}
                                src={`${'/boton-de-play.png'}`}
                                width={200}
                                height={200}
                            />
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                        </Item2>
                    </Grid>
                </Grid>
            </Box>
        </MainLayout>
    )
}
