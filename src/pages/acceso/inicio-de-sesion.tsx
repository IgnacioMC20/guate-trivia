import { Button, Card, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material'
import { NextPage } from 'next'
import NextLink from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { AuthContext } from '@/context'
import { AuthLayout } from '@/layout'
import { showToast, validations } from '@/utils'

import logoImage from '/public/logo.png'

type FormData = {
    email: string,
    password: string,
    remember: boolean
}

const LoginPage: NextPage = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>()
    const { loginUser } = useContext(AuthContext)
    const router = useRouter()
    const [isRemember, setIsRemember] = useState(false)

    const onLoginUser = async ({ email, password, remember }: FormData) => {
        const isValidLogin = await loginUser(email, password)
        if (remember) {
            localStorage.setItem('email', email)
        } else {
            // Si el checkbox no está seleccionado, elimina el correo del localStorage
            localStorage.removeItem('email')
        }

        if (!isValidLogin) {
            showToast('Credenciales incorrectas')
            return
        }

        router.replace('/')
    }

    const emailInputRef = useRef(null)

    useEffect(() => {
        // Enfoca el campo de entrada de correo cuando el componente se monta
        emailInputRef.current.focus()
    }, [])

    useEffect(() => {
        const storedEmail = localStorage.getItem('email')
        if (storedEmail) {
            // Si hay un correo almacenado, establece su valor en el formulario
            setValue('email', storedEmail)
            setIsRemember(true)
        }
    }, [setValue])

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
                                        priority
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
                                        inputRef={emailInputRef}
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
                                            minLength: { value: 8, message: 'Minimo de 8 caracteres' },
                                            validate: (value) => validations.isValidPassword(value) || 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
                                        })}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        autoComplete='false' />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox
                                            value="remember"
                                            color='primary'
                                            checked={isRemember}
                                            {...register('remember')}
                                            onChange={(e) => setIsRemember(e.target.checked)}
                                            sx={{
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
                                <Grid item xs={12} display='flex' justifyContent='end'>
                                    {/* <NextLink href={'/acceso/recuperar-credenciales'} passHref legacyBehavior>
                                        <Link underline='hover'>
                                            Olvidaste tu Contraseña
                                        </Link>
                                    </NextLink> */}

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