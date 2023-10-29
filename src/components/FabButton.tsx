import DiamondIcon from '@mui/icons-material/Diamond'
import { Card, Fab, Grid, Modal, Typography } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

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
            <Fab variant="circular" color='info' sx={{
                position: 'fixed',
                bottom: '20px',
                right: '20px'
            }} onClick={handleOpen}>
                <DiamondIcon />
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Card sx={{ backgroundColor: '#FDFFB6', width: '100%', maxWidth: '300px', height: 'auto', marginBottom: '15px', borderStyle: 'solid', borderColor: 'black', borderWidth: '1px' }}>
                    <Grid container sx={{ width: '100%', padding: '15px' }} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection="column">
                        <Typography textAlign={'center'} variant="h4" my={2}>
                            Insignias
                        </Typography>
                        <Grid item sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', my: '2px' }}>
                            <Grid item  display={'flex'} flexDirection={'column'} alignItems={'center'} my={1}>
                                <Image src='/icons8-diamon.png' alt='' width={50} height={50} />
                                <Typography variant="h5" component="p">
                                    3 x Diamantes
                                </Typography>
                            </Grid>
                            <Grid item  display={'flex'} flexDirection={'column'} alignItems={'center'} my={1}>
                                <Image src='/icons8-coin-64.png' alt='' width={50} height={50} />
                                <Typography variant="h5" component="p">
                                    3 x Oro
                                </Typography>
                            </Grid>
                            <Grid item  display={'flex'} flexDirection={'column'} alignItems={'center'} my={1}>
                                <Image src='/icons8-coin-64-silver.png' alt='' width={50} height={50} />
                                <Typography variant="h5" component="p">
                                    3 x Plata
                                </Typography>
                            </Grid>
                            <Grid item  display={'flex'} flexDirection={'column'} alignItems={'center'} my={1}>
                                <Image src='/icons8-coin-64-bronce.png' alt='' width={50} height={50} />
                                <Typography variant="h5" component="p">
                                    3 x Bronce
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>

            </Modal>
        </>
    )
}

