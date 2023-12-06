import { PersonAdd } from '@mui/icons-material'
import { Box, Button, Modal, Typography } from '@mui/material'
import Image from 'next/image'
import { useContext } from 'react'

import { AuthContext, UIContext } from '@/context'
import { UserProfile } from '@/interfaces'
import { gtApi, images, showToast } from '@/utils'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
}

export const UserModal = () => {

  // TODO: agregar array de amigos al contexto
  const { toggleUserModal, isUserModalOpen, resetUserProfile, userProfile } = useContext(UIContext)
  /* eslint-disable-next-line no-unused-vars */
  const { user, friendIds, setFriendIds } = useContext(AuthContext) as { user: UserProfile, friendIds: string[], setFriendIds: (ids: string[]) => void }

  const handleCloseModal = () => {
    toggleUserModal()
    resetUserProfile()
  }

  //TODO: terminar metodo
  const addFriend = async (id: string) => {
    
    try {
      const { data } = await gtApi.post('/friend', { user_id_1: user?.id, user_id_2: id })
      
      if (data.error) {
        return showToast(data.message)
      }
      
      const { success, message } = data
      
      if (!success) {
        return showToast(message)
      }
      
      setFriendIds([id, ...friendIds])
      return showToast(message, 'success')
      
    } catch (error) {
      console.log('Data from server:', error)
      
    }
  }

  if (userProfile) {
    const { avatar, name, email, level, trophys } = userProfile
    return (
      <Modal
        open={isUserModalOpen}
        onClose={handleCloseModal}
      >
        {
          userProfile ? (
            <Box sx={style} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
              <div style={{ marginTop: '20px' }}>
                <Image
                  priority
                  src={images.find((image) => image.id === parseInt(avatar))?.src!}
                  alt={`Avatar de ${name}`}
                  width={220}
                  height={200}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                  }}
                />
              </div>
              <Typography variant="h5" component="h2">
                {name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Nivel: {level}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Insignias: {trophys}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {email}
              </Typography>
              {/* todo: verificar si son amigos */}
              {
                friendIds.includes(userProfile.id!) ? (
                  null
                ) : (
                  <Button sx={{ marginTop: '15px' }} onClick={() => addFriend(userProfile.id!)} component="label" variant="contained" startIcon={<PersonAdd />}>
                    Agregar
                  </Button>
                )
              }

            </Box>
          ) : (
            <Box sx={style}>
              <Typography variant='h6' component='h2'>Error al cargar usuario</Typography>
            </Box>
          )
        }

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
