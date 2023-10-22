import {
    Card,
    Grid,
    TextField,
    Typography,
    Link,
    Button,
} from '@mui/material'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'

import { AuthLayout } from '@/layout'

type FormData = {
    email: string
}

const ResetPasswordPage: NextPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    const onSubmit = (data: FormData) => {
        // Aquí puedes manejar la lógica de envío de la solicitud de recuperación de contraseña
        console.log('Email a recuperar: ', data.email)
    }

    return (
        <AuthLayout title={'Recuperar Contraseña'}>
            <Grid container sx={{ height: '100%' }} display='flex' justifyContent='center' alignItems='center'>
                <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                    <Card
                        sx={{
                            width: {
                                sm: '80%',
                                md: '50%',
                            },
                            padding: '50px 50px',
                            backgroundColor: '#FDFFB6',
                        }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Grid container spacing={4}>
                                <Grid item xs={12} display='flex' justifyContent='center'>
                                    <Typography color='primary' variant='h1' component='h1'>
                                        Recuperar Contraseña
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        sx={{ backgroundColor: 'white' }}
                                        label='Correo Electrónico'
                                        type='email'
                                        variant='outlined'
                                        fullWidth
                                        {...register('email', {
                                            required: 'Este campo es requerido',
                                            validate: (value) =>
                                                /\S+@\S+\.\S+/.test(value) || 'Correo no válido',
                                        })}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type='submit' size='large' fullWidth>
                                        Enviar Solicitud
                                    </Button>
                                </Grid>
                                <Grid item xs={12} display='flex' justifyContent='space-around'>
                                    <NextLink href={'/acceso/inicio-de-sesion'} passHref legacyBehavior>
                                        <Link underline='hover'>Iniciar Sesión</Link>
                                    </NextLink>
                                    <NextLink href={'/acceso/crear-cuenta'} passHref legacyBehavior>
                                        <Link underline='hover'>Crear Cuenta</Link>
                                    </NextLink>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </AuthLayout>
    )
}

export default ResetPasswordPage
