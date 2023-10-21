import { Button, Card, Grid, Link, TextField, Typography } from '@mui/material'
import { AxiosResponse } from 'axios'
import { NextPage } from 'next'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { AuthLayout } from '@/layout'
import { gtApi, images, validations, } from '@/utils'

type FormData = {
    email: string
    name: string
    password: string
    confirmPassword: string
}

const RegisterPage: NextPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
    const router = useRouter()
    const [selectedImage, setSelectedImage] = useState<number | null>(null)

    const onRegisterUser = async ({ email, password, name }: FormData) => {
        if (!selectedImage) {
            return toast.error('🌴 Debes seleccionar un avatar!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
        }

        try {
            const { data }: AxiosResponse = await gtApi.post('/auth/signup', {
              email,
              password,
              name,
              avatar: selectedImage,
            })
            console.log(data)
            
            router.replace('/')
        } catch (error: any) {
            if (error.response) {
                // El servidor respondió con un estado de error (por ejemplo, un error 4xx o 5xx)
                console.error('Error en la respuesta del servidor:', error.response.data)
                // Puedes mostrar un mensaje de error al usuario si es relevante
            } else if (error.request) {
                // La solicitud se hizo pero no se recibió respuesta (por ejemplo, problemas de red)
                console.error('No se pudo obtener una respuesta del servidor.')
                // Puedes mostrar un mensaje de error de red al usuario si es relevante
            } else {
                // Ocurrió un error en la configuración de la solicitud (por ejemplo, error en Axios)
                console.error('Error en la configuración de la solicitud:', error.message)
                // Puedes mostrar un mensaje de error genérico al usuario
            }
        }

        //todo: push to dashboard
        // console.log({ email, password, name, avatar: selectedImage })
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