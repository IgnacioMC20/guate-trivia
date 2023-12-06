import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { AuthContext, UIContext } from '@/context'
import { UserProfile } from '@/interfaces'
import { gtApi, showToast } from '@/utils'

interface Props {
    usuariosArray: UserProfile[]
}

export const DataTable = ({ usuariosArray }: Props) => {
    const {pathname} = useRouter()

    const { toggleUserModal, setUserProfile } = useContext(UIContext)
    const { friendIds } = useContext(AuthContext)

    const getUserProfile = async (id: string) => {
        const { data } = await gtApi.post('/profile', { id })
        const { userProfile, message } = data

        if (message) return showToast(message)

        setUserProfile(userProfile)
        toggleUserModal()
    }
    return (
        <TableContainer component={Paper} sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                        <TableCell>#</TableCell>
                        {/* <TableCell>id</TableCell> */}
                        <TableCell>Nombre</TableCell>
                        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Correo</TableCell>
                        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, textAlign: 'center' }}>Nivel</TableCell>
                        <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, textAlign: 'center' }}>Número de Insignias</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usuariosArray.map((user, i) => (
                        <TableRow key={i + 1}>
                            <TableCell>{i + 1}</TableCell>
                            {/* <TableCell>{user.id}</TableCell> */}
                            <TableCell>{user.name}</TableCell>

                            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{user.email}</TableCell>
                            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, textAlign: 'center' }}>{user.level}</TableCell>
                            <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, textAlign: 'center' }}>{user.trophys}</TableCell>

                            <TableCell sx={{ textAlign: 'center' }}>
                                {
                                    friendIds.includes(user.id!) ? (
                                        <Button variant='outlined' disabled={pathname.includes('buscar')} onClick={() => getUserProfile(user.id!)}>
                                            <Typography color={'black'}>
                                                {
                                                    pathname.includes('buscar') ? 'Ya es tu amigo' : 'Ver perfil'
                                                }
                                            </Typography>
                                        </Button>
                                    ) : (
                                        <Button variant='outlined' onClick={() => getUserProfile(user.id!)}>
                                            <Typography color={'black'}>Ver perfil</Typography>
                                        </Button>
                                    )
                                }

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
