import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import React from 'react'

import { MainLayout } from '@/layout'

interface Amigo {
  id: number
  nombre: string
  puntos: number
  insignias: number
}

const AmigosPage: React.FC = () => {
  
  const amigosData: Amigo[] = [
    { id: 1, nombre: 'Juan', puntos: 1500, insignias: 3 },
    { id: 2, nombre: 'Maria', puntos: 1200, insignias: 2 },
    { id: 3, nombre: 'Carlos', puntos: 1800, insignias: 4 },
    { id: 4, nombre: 'Ana', puntos: 1000, insignias: 1 },
    { id: 5, nombre: 'Pedro', puntos: 2000, insignias: 5 },
  ]

  return (
    <MainLayout title='Amigos' pageDescription='Amigos'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Cantidad de Puntos</TableCell>
              <TableCell>Número de Insignias</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {amigosData.map((amigo) => (
              <TableRow key={amigo.id}>
                <TableCell>{amigo.id}</TableCell>
                <TableCell>{amigo.nombre}</TableCell>
                <TableCell>{amigo.puntos}</TableCell>
                <TableCell>{amigo.insignias}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainLayout>
  )
}

export default AmigosPage
