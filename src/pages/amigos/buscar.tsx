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

    if (s === '') {
        return {
            props: {
                users: [],
                message: 'No hay resultados',
            },
        }
    }

    try {
        const { data } = await gtApi.get(`/search?s=${s}`)
        const { success, users, message } = data

        const token = ctx.req.cookies.token || ''
        const id = jwt.getId(token) || ''

        if (!success || !Array.isArray(users)) {
            return {
                props: {
                    users: [],
                    message: message || 'Hubo un problema al buscar usuarios',
                },
            }
        }

        if(users.length === 0) {
            return {
                props: {
                    users: [],
                    message: 'No hay resultados',
                },
            }
        }

        const response = await gtApi.get(`/friend?userId=${id}`)
        const { data: friendData } = response

        const friendIds = friendData?.friendIds || []
        const filteredUsers = users.filter((u: UserProfile) => u.id !== id)

        return {
            props: {
                users: filteredUsers,
                friendIds,
                success,
            },
        }
    } catch (error) {
        console.error('Error:', error)
        return {
            props: {
                users: [],
                message: 'Hubo un error al procesar la solicitud',
            },
        }
    }
}
