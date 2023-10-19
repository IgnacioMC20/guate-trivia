import { Button, Card, Grid, Link, TextField, Typography } from '@mui/material'
// import bcrypt from 'bcrypt'
import { NextPage } from 'next'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'

import { AuthLayout } from '@/layout'
import { validations } from '@/utils'

type FormData = {
    email: string
    name: string
    password: string
    confirmPassword: string
}

interface Image {
    id: number
    src: string
}

const RegisterPage: NextPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
    const router = useRouter()

    const onRegisterUser = async ({ email, password, name }: FormData) => {
        // const hashPass = bcrypt.hashSync(password, 10)
        if (!selectedImage) {
            return toast.error('🦄 Debes seleccionar una image!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
        }
        console.log({ email, password, name, selectedImage })
    }

    const samePasswordAs = (password: string) => {
        return (value: string) => {
            return value === password || 'Las contraseñas no coinciden'
        }
    }

    const isValidPassword = (password: string) => {
        // Validar que la contraseña tenga al menos 8 caracteres, una mayúscula, una minúscula y un número
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
        return passwordPattern.test(password)
    }

    const [selectedImage, setSelectedImage] = useState<number | null>(null)

    const images: Image[] = [
        { id: 1, src: '/test-avatar.png' },
        { id: 2, src: '/test-avatar.png' },
        { id: 3, src: '/test-avatar.png' },
        { id: 4, src: '/test-avatar.png' },
    ]

    const handleImageClick = (id: number) => {
        setSelectedImage(id)
    }

    const password = watch('password', '')

    return (
        <AuthLayout title={'Registro'}>
            <ToastContainer />
            <Grid container sx={{ height: '100%' }}>
                <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                    <Card sx={{
                        width: {
                            sm: '80%',
                            md: '50%'
                        }, padding: '25px 25px', backgroundColor: '#FDFFB6'
                    }}>
                        <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
                            <Grid container spacing={4}>
                                <Grid item xs={12} display='flex' justifyContent='center'>
                                    <Typography color='primary' variant='h1' component='h1'>Crear Cuenta</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label='Nombre Apellido'
                                        variant='outlined'
                                        sx={{ backgroundColor: 'white' }}
                                        fullWidth
                                        {...register('name', {
                                            required: 'Este campo es requerido',
                                        })}
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label='Correo'
                                        variant='outlined'
                                        sx={{ backgroundColor: 'white' }}
                                        fullWidth
                                        {...register('email', {
                                            required: 'Este campo es requerido',
                                            validate: (value) => validations.isEmail(value)
                                        })}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        autoComplete='false'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label='Contraseña'
                                        type='password'
                                        variant='outlined'
                                        sx={{ backgroundColor: 'white' }}
                                        fullWidth
                                        {...register('password', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 8, message: 'Minimo de 8 caracteres' },
                                            validate: (value) => isValidPassword(value) || 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
                                        })}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        autoComplete='false'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label='Confirmar Contraseña'
                                        type='password'
                                        variant='outlined'
                                        sx={{ backgroundColor: 'white' }}
                                        fullWidth
                                        {...register('confirmPassword', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 6, message: 'Minimo de 6 caracteres' },
                                            validate: samePasswordAs(password),
                                        })}
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message}
                                        autoComplete='false'
                                    />
                                </Grid>

                                <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                                    <Card sx={{ width: '100%', padding: '10px 10px', backgroundColor: '#fff', border: '1px solid #c4c4c4' }}>
                                        <Grid container spacing={4} display={'flex'} justifyContent={'space-around'}>
                                            {images.map((image) => (
                                                <Grid item display={'flex'} justifyContent={'center'} key={image.id}>
                                                    <div
                                                        style={{ cursor: 'pointer' }}
                                                        className={`image-container ${selectedImage === image.id ? 'selected' : ''}`}
                                                        onClick={() => handleImageClick(image.id)}
                                                    >
                                                        <Image src={image.src} width={50} height={50} alt={`Image ${image.id}`} />
                                                    </div>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button size='large' type='submit' fullWidth>Crear</Button>
                                </Grid>
                                <Grid item xs={12} display='flex' justifyContent='end'>
                                    <NextLink href={router.query.p ? `/acceso/inicio-de-sesion?p=${router.query.p.toString()}` : '/acceso/inicio-de-sesion'} passHref legacyBehavior>
                                        <Link underline='hover'>
                                            Ya tienes cuenta?
                                        </Link>
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

export default RegisterPage