import { Button, Card, Grid, Link, TextField, Typography } from '@mui/material'
import { NextPage } from 'next'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

import { AuthContext } from '@/context'
import { AuthLayout } from '@/layout'
import { images, showToast, validations, } from '@/utils'

type FormData = {
    email: string
    name: string
    password: string
    confirmPassword: string
}

const RegisterPage: NextPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
    const { registerUser } = useContext(AuthContext)
    const router = useRouter()
    const [selectedImage, setSelectedImage] = useState<number | null>(null)

    const onRegisterUser = async ({ email, password, name }: FormData) => {
        if (!selectedImage) {
            showToast('Debes seleccionar una imagen')
            return
        }

        const { hasError, message } = await registerUser({
            email,
            password,
            name,
            avatar: selectedImage!,
        })

        if (hasError) {
            showToast(message!)
            return
        }

        router.replace('/')
    }

    const samePasswordAs = (password: string) => {
        return (value: string) => {
            return value === password || 'Las contraseñas no coinciden'
        }
    }

    const handleImageClick = (id: number) => {
        setSelectedImage(id)
    }

    const password = watch('password', '')

    return (
        <AuthLayout title={'Registro'}>
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
                                            validate: (value) => validations.isValidPassword(value) || 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
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
                                            minLength: { value: 8, message: 'Minimo de 8 caracteres' },
                                            validate: samePasswordAs(password),
                                        })}
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message}
                                        autoComplete='false'
                                    />
                                </Grid>

                                <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                                    <Card sx={{ width: '100%', padding: '10px 10px', backgroundColor: '#fff', border: '1px solid #c4c4c4' }}>
                                        <Grid container spacing={2} display={'flex'} justifyContent={'space-around'}>
                                            {images.map((image) => (
                                                <Grid item display={'flex'} justifyContent={'center'} key={image.id}>
                                                    <div
                                                        style={{ cursor: 'pointer' }}
                                                        className={`image-container ${selectedImage === image.id ? 'selected' : ''}`}
                                                        onClick={() => handleImageClick(image.id)}
                                                    >
                                                        <Image priority src={image.src} width={100} height={100} alt={`Image ${image.id}`} />
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