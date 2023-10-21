import { LockClockOutlined } from '@mui/icons-material'
import { Avatar, Button, Card, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

// import { AuthContext } from '@/context'
import { AuthLayout } from '@/layout'
import { validations } from '@/utils'

import Image from 'next/image'

import logoImage from '/public/logo.png'

type FormData = {
    email: string,
    password: string,
}

const LoginPage: NextPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
    const router = useRouter()

    const onLoginUser = async ({ email, password }: FormData) => {
        console.log({ email, password })
        //todo: validar email y password
    }

    //todo: agregar validaciones tambien en el registro
    const isValidPassword = (password: string) => {
        // Validar que la contraseña tenga al menos 8 caracteres, una mayúscula, una minúscula y un número
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
        return passwordPattern.test(password)
    }

    return (
        <AuthLayout title={'Login'}>
            <Grid container sx={{ height: '100%' }} display='flex' justifyContent='center' alignItems='center'>
                <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                    <Card sx={{
                        width: {
                            sm: '80%',
                            md: '50%'
                        }, padding: '50px 50px', backgroundColor: '#FDFFB6'
                    }}>
                        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                            <Grid container spacing={4}>
                                <Grid item xs={12} display='flex' justifyContent='center'>
                                    <Typography color='primary' variant='h1' component='h1'>Iniciar Sesión</Typography>
                                </Grid>
                                <Grid item xs={12} display='flex' justifyContent='center'>
                                    {/* <Avatar sx={{ m: 1, bgcolor: 'main' }}> */}
                                        <Image
                                            src={logoImage}
                                            alt="Logo Guate-Trivia"
                                            width={150}
                                            height={150}
                                        />
                                    {/* </Avatar> */}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        sx={{ backgroundColor: 'white' }}
                                        label='Correo'
                                        type='email'
                                        variant='outlined'
                                        fullWidth
                                        {...register('email', {
                                            required: 'Este campo es requerido',
                                            validate: (value) => validations.isEmail(value)
                                        })}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        autoComplete='false' />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        sx={{ backgroundColor: 'white' }}
                                        label='Contraseña'
                                        type='password'
                                        variant='outlined'
                                        fullWidth
                                        {...register('password', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 6, message: 'Minimo de 6 caracteres' }
                                        })}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        autoComplete='false' />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color='primary' sx={{
                                            '&.Mui-checked': {
                                                '& .MuiSvgIcon-root': {
                                                    backgroundColor: 'white',
                                                },
                                            },
                                        }} />}
                                        label="Recuérdame"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type='submit' size='large' fullWidth>Ingresar</Button>
                                </Grid>
                                <Grid item xs={12} display='flex' justifyContent='space-around'>
                                    <NextLink href={'/acceso/recuperar-credenciales'} passHref legacyBehavior>
                                        <Link underline='hover'>
                                            Olvidaste tu Contraseña
                                        </Link>
                                    </NextLink>

                                    <NextLink href={router.query.p ? `/acceso/crear-cuenta?p=${router.query.p.toString()}` : '/acceso/crear-cuenta'} passHref legacyBehavior>
                                        <Link underline='hover'>
                                            No tienes cuenta?
                                        </Link>
                                    </NextLink>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Grid >
        </AuthLayout >
    )
}

export default LoginPage