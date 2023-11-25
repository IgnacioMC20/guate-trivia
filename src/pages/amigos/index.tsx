import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, Button } from '@mui/material'
import React, { useContext } from 'react'

import { UserModal } from '@/components'
import { UIContext } from '@/context'
import { MainLayout } from '@/layout'
import { gtApi, showToast } from '@/utils'

interface Amigo {
  id: string
  idNum: number
  nombre: string
  nivel: number
  insignias: number
}

// TODO: get all friends from user
const AmigosPage: React.FC = () => {
  //TODO: set user profile in context
  const { toggleUserModal, setUserProfile } = useContext(UIContext)

  const getUserProfile = async (id: string) => {

    const { data } = await gtApi.post('/profile', { id })

    const { userProfile, message } = data

    if (message) return showToast('error', message)

    console.log(userProfile, 'userProfile')

    //TODO: render modal with userProfile
    setUserProfile(userProfile)
    toggleUserModal()
    // < Button onClick = { handleOpen } > Open modal</ >

  }
  const amigosData: Amigo[] = [
    { id: '65610d9beb6786ae47f00f97', idNum: 1, nombre: 'Juan', nivel: 1, insignias: 3 },
    { id: '65610d9beb6786ae47f00f97', idNum: 2, nombre: 'Maria', nivel: 2, insignias: 2 },
    { id: '65610d9beb6786ae47f00f97', idNum: 3, nombre: 'Carlos', nivel: 1, insignias: 4 },
    { id: '65610d9beb6786ae47f00f97', idNum: 4, nombre: 'Ana', nivel: 4, insignias: 1 },
    { id: '65610d9beb6786ae47f00f97', idNum: 5, nombre: 'Pedro', nivel: 5, insignias: 5 },
  ]

  return (
    <MainLayout title='Amigos' pageDescription='Amigos'>
      <UserModal />
      <Grid container sx={{ height: { xs: 'auto', sm: 'calc(100vh - 130px)' }, padding: '50px 10px' }} display={'flex'} flexDirection={'column'}>
        <Typography variant='h1' sx={{ marginBottom: '50px' }}>Amigos</Typography>
        <TableContainer component={Paper} sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Cantidad de Puntos</TableCell>
                <TableCell>Número de Insignias</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {amigosData.map((amigo) => (
                <TableRow key={amigo.idNum}>
                  <TableCell>{amigo.id}</TableCell>
                  <TableCell>{amigo.nombre}</TableCell>
                  <TableCell>{amigo.insignias}</TableCell>
                  <TableCell>
                    <Button variant='outlined' onClick={() => getUserProfile(amigo.id)}>
                      <Typography color={'black'}>Ver perfil</Typography>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </MainLayout>
  )
}

export default AmigosPage
