import { Grid } from '@mui/material'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import React, { useContext, useEffect } from 'react'

import { UserModal, DataTable, NoFriends, SearchFriend } from '@/components'
import { AuthContext } from '@/context'
import { UserProfile } from '@/interfaces'
import { MainLayout } from '@/layout'
import { jwt } from '@/utils'

interface Props {
  amigos?: UserProfile[]
  success: boolean
  friendsIds?: string[]
}

const AmigosPage: React.FC<Props> = ({ success, amigos, friendsIds = [] }) => {

  const { setFriendIds } = useContext(AuthContext)

  useEffect(() => {
    setFriendIds(friendsIds)
  }, [])

  return (
    <MainLayout title='Amigos' pageDescription='Amigos'>
      <UserModal />
      <Grid container sx={{ height: { xs: 'auto', sm: 'calc(100vh - 130px)' }, padding: '50px 30px' }} display={'flex'} flexDirection={'column'}>
        <SearchFriend title={'Amigos'} />
        {
          (success && amigos) ? (
            <DataTable usuariosArray={amigos} />
          ) : (
            <NoFriends />
          )
        }
      </Grid>
    </MainLayout>
  )
}

export default AmigosPage

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const token = ctx.req.cookies.token || ''
    const id = jwt.getId(token) || ''
    const { data } = await axios.get(`/friend?userId=${id}`)
    const { success, data: _data } = data

    // data contiene la respuesta del endpoint al que llamaste
    // Haces algo con los datos, como pasarlos a props
    return {
      props: {
        amigos: _data.usersArrayFiltered,
        friendsIds: _data.friendIds,
        success: success
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    // Maneja cualquier error aquí
    return {
      props: {
        amigos: [],
        friendsIds: [],
        success: false
      },
    }
  }
}
