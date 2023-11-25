import { Box, Card, CardContent, Modal, Typography } from '@mui/material'
import Image from 'next/image'
import { useContext } from 'react'

import { UIContext } from '@/context'
import { images } from '@/utils'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const UserModal = () => {

  const { toggleUserModal, isUserModalOpen, resetUserProfile, userProfile } = useContext(UIContext)
  const handleCloseModal = () => {
    toggleUserModal()
    resetUserProfile()
  }

  if (userProfile) {
    const { avatar, name, email, level } = userProfile
    return (
      <Modal
        open={isUserModalOpen}
        onClose={handleCloseModal}
      >
        <Box sx={style}>
          <Card variant="outlined" style={{ width: '80%', maxWidth: '400px', padding: '20px', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Perfil de {name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Nivel: {level}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Correo electrónico: {email}
              </Typography>
              <div style={{ marginTop: '20px' }}>
                <Image
                  priority
                  src={images[parseInt(avatar)].src}
                  alt={`Avatar de ${name}`}
                  width={220}
                  height={200}
                  style={{
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    )
  }

  return (
    <Modal
      open={isUserModalOpen}
      onClose={handleCloseModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography variant='h6' component='h2'>Error al cargar usuario</Typography>
      </Box>
    </Modal>
  )
}
