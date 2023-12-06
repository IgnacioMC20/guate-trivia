import { Grid } from '@mui/material'
import { GetServerSidePropsContext } from 'next'
import { useContext, useEffect } from 'react'

import { DataTable, NoFriends, SearchFriend, UserModal } from '@/components'
import { AuthContext } from '@/context'
import { UserProfile } from '@/interfaces'
import { MainLayout } from '@/layout'
import { gtApi, jwt } from '@/utils'

interface Props {
    users?: any[]
    message?: string
    success: boolean
    friendIds?: string[]
}

export default function buscarPage({ users, success, message, friendIds = [] }: Props) {
    const { setFriendIds } = useContext(AuthContext)

    useEffect(() => {
        setFriendIds(friendIds)
    }, [])

    return (
        <MainLayout pageDescription='Buscar Amigos' title='Buscar'>
            <UserModal />
            <Grid container sx={{ height: { xs: 'auto', sm: 'calc(100vh - 130px)' }, padding: '50px 30px' }} display={'flex'} flexDirection={'column'}>
                <SearchFriend title={'Buscar Usuarios'} />
                {
                    (success && users) ? (
                        <DataTable usuariosArray={users} />
                    ) : (
                        <NoFriends message={message} />
                    )
                }
            </Grid>
        </MainLayout>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

    const s = ctx.query?.s || ''

    if (s === '') return {
        props: {
            users: [],
            message: 'No hay resultados',
        }
    }

    const { data } = await gtApi.get(`/search?s=${s}`)
    const { success, users, message } = data
    const token = ctx.req.cookies.token || ''
    const id = jwt.getId(token) || ''
    const response = (await gtApi.get(`/friend?userId=${id}`)).data
    const { data: _data } = response

    const filteredUsers = users?.filter((u: UserProfile) => u.id !== id)

    if (!success) return {
        props: {
            users: [],
            message
        }
    }

    return {
        props: {
            users: filteredUsers,
            friendIds: _data.friendIds,
            success
        }
    }
}