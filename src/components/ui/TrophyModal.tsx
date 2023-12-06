// import DiamondIcon from '@mui/icons-material/Diamond'
import { CloseOutlined } from '@mui/icons-material'
import { Button, Card, Grid, IconButton, Modal, Typography } from '@mui/material'
import Image from 'next/image'
import { useContext, useState } from 'react'

import { AuthContext } from '@/context'

export const TrophyModal = () => {
    const [open, setOpen] = useState(false)
    const { user } = useContext(AuthContext)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Button
                color='info'
                onClick={handleOpen}
                sx={{
                    border: '1px solid #000',
                    margin: '0 0.5rem'
                }}>
                Ver
            </Button>
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
                <Card sx={{
                    backgroundColor: '#FDFFB6',
                    width: '100%',
                    maxWidth: '300px',
                    height: 'auto',
                    maxHeight: 'calc(100vh - 10%)',
                    marginBottom: '15px',
                    position: 'relative',
                    overflow: 'auto', /* Usar overflow: auto en lugar de overflow: scroll */
                    '&::-webkit-scrollbar': {
                        width: '0.4rem', /* Ancho del scrollbar */
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'transparent', /* Color del fondo del track */
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'gray', /* Color del thumb del scrollbar */
                        borderRadius: '0.2rem', /* Bordes del thumb */
                    },
                }}>
                    <Grid container sx={{ width: '100%', padding: '15px' }} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection="column">
                        {/* <Typography textAlign={'center'} variant="h4" my={2}>
                            Insignias
                        </Typography> */}

                        <IconButton
                            style={{ position: 'absolute', top: 5, right: 5 }}
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseOutlined />
                        </IconButton>
                        <Grid item sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', my: '2px' }}>
                            {
                                user?.email === 'jm10cuyun@gmail.com' && (<>
                                    <Grid item display={'flex'} flexDirection={'column'} alignItems={'center'} my={1}>
                                        <Image src='/insignias/jade.png' alt='' width={100} height={100} />
                                        <Typography variant="h5" component="p">
                                            1 x Jade
                                        </Typography>
                                    </Grid>
                                    <Grid item display={'flex'} flexDirection={'column'} alignItems={'center'} my={1}>
                                        <Image src='/insignias/oro.png' alt='' width={100} height={100} />
                                        <Typography variant="h5" component="p">
                                            2 x Oro
                                        </Typography>
                                    </Grid>
                                    <Grid item display={'flex'} flexDirection={'column'} alignItems={'center'} my={1}>
                                        <Image src='/insignias/plata.png' alt='' width={100} height={100} />
                                        <Typography variant="h5" component="p">
                                            3 x Plata
                                        </Typography>
                                    </Grid>
                                    <Grid item display={'flex'} flexDirection={'column'} alignItems={'center'} my={1}>
                                        <Image src='/insignias/bronce.png' alt='' width={100} height={100} />
                                        <Typography variant="h5" component="p">
                                            4 x Bronce
                                        </Typography>
                                    </Grid>
                                </>
                                )
                            }
                            <Grid item display={'flex'} flexDirection={'column'} alignItems={'center'} my={1}>
                                <Image src='/insignias/welcome.png' alt='' width={100} height={100} />
                                <Typography variant="h5" component="p">
                                    Bienvenido
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>

            </Modal>
        </>
    )
}

