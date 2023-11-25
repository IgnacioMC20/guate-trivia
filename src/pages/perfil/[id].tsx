import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { GetServerSideProps } from 'next'
import Image from 'next/image'

import { getUser } from '@/db/dbUser'
import { UserProfile } from '@/interfaces'
import { MainLayout } from '@/layout'
import { images } from '@/utils'

interface ProfilePageProps {
    userProfile: UserProfile
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userProfile }) => {
    const { avatar, name, email, level } = userProfile  
    return (
        <MainLayout title='Perfil' pageDescription='Perfil'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
                                        src={images[avatar].src}
                                        alt={`Avatar de ${name}`}
                                        width={220}
                                        height={200}
                                        style={{
                                            maxWidth: '100%',
                                            height: 'auto'
                                        }}
                                    />
                        </div>
                        {/* Otros detalles del perfil */}
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const id = ctx.params?.id || ''

    try {
        const user = await getUser(id as string)
        console.log(user, 'userrr')
        if (!user) return {
            redirect: {
                destination: '/amigos',
                permanent: false,
            },
        }
        const userProfile = {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            level: user.level,
        }

        return {
            props: {
                userProfile,
            },

        }
    } catch (error) {
        console.error('Error fetching user data:', error)
        return {
            redirect: {
                destination: '/amigos',
                permanent: false,
            },
        }
    }
}

export default ProfilePage