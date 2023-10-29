import { ArrowUpward } from '@mui/icons-material'
import DiamondIcon from '@mui/icons-material/Diamond'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { Box, Card, Container, Fab, Grid, Icon, Modal, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'

export const FabButton = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Fab variant="circular" color='secondary' sx={{
                position: 'fixed',
                bottom: '20px',
                right: '20px'
            }} onClick={handleOpen}>
                <DiamondIcon/>
            </Fab>            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >               
                <Card sx={{ backgroundColor: '#FDFFB6', width: '300px', height: '550px', marginBottom: '15px', borderStyle: 'solid', borderColor: 'black', borderWidth: '1px' }}>                    
                    <Grid container sx={{ width: '80%' }} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Grid item>
                        <Typography variant="h1" component="h2">
                            Insignias
                        </Typography>
                    </Grid>
                    </Grid>
                    <Grid container sx={{ width: '80%' }} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Grid item>
                            <Image src='/icons8-diamon.png'
                                alt=''
                                width={50}
                                height={50}></Image>
                            <Typography variant="h4" component="p">
                                3 x Diamantes
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Image src='/icons8-coin-64.png'
                                alt=''
                                width={50}
                                height={50}></Image>
                            <Typography variant="h4" component="p">
                                3 x Oro
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Image src='/icons8-coin-64-silver.png'
                                alt=''
                                width={50}
                                height={50}></Image>
                           <Typography variant="h4" component="p">
                                3 x Plata
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Image src='/icons8-coin-64-bronce.png'
                                alt=''
                                width={50}
                                height={50}></Image>
                            <Typography variant="h4" component="p">
                                3 x Bronce
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Modal>
        </>
    )
}

