import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Button, Card, Typography } from '@mui/material'
import Cookies from 'js-cookie'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import { BasicModal, NoQuestion } from '@/components'
import { UIContext } from '@/context'
import { dbQuestion } from '@/db'
import { IQuestionFE } from '@/interfaces'
import { MainLayout } from '@/layout'
import { showToast } from '@/utils'

interface Props {
    pregunta: IQuestionFE
    message?: string
    ok: boolean
}

interface RespuestaItem {
    clave: string;
    respuesta: string;
}

type SelectedValue = 'A' | 'B' | 'C'

const PlayPage: React.FC<Props> = ({ pregunta, message, ok }) => {

    const router = useRouter()

    useEffect(() => {
        if (ok) {
            const lastQuestion = Number(router.query.id)
            Cookies.set('lastQuestion', lastQuestion.toString())
        }
    }, [router.query.id])

    if (!ok) {
        return (
            <NoQuestion message={message!} />
        )

    }

    const [selectedValue, setSelectedValue] = useState<null | SelectedValue>(null)
    const { rightAnswer, wrongAnswer, toggleModal } = useContext(UIContext)

    const respuestasArray: RespuestaItem[] = Object.keys(
        pregunta.respuestas
    ).map((clave) => {
        const respuesta = pregunta.respuestas[clave]
        return {
            clave,
            respuesta,
        }
    })
    const onHandleSelect = (clave: SelectedValue) => {
        setSelectedValue(clave)
    }

    const onHandleSubmit = () => {
        if (!selectedValue) return showToast('Selecciona una respuesta')

        toggleModal()

        if (selectedValue === pregunta.respuestas.correcta) rightAnswer()
        else wrongAnswer()

    }

    return (
        <MainLayout pageDescription='Jugar' title='Jugar'>
            <BasicModal />
            <Grid container sx={{ height: { xs: 'auto', sm: 'calc(100vh - 130px)' }, padding: { xs: '50px 10px', sm: '50px 200px' } }}>
                <Grid item xs={12} sx={{ height: '100%' }} display={'flex'} justifyContent={'center'}>
                    <fieldset style={{ background: '#FDFFB6', height: '100%', display: 'flex', flexWrap: 'wrap' }}>
                        <legend>Guate-Trivia</legend>
                        <Card sx={{ background: 'transparent', boxShadow: 'none', padding: { xs: '', sm: '50px' }, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Grid container sx={{ height: '100%' }}>
                                <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    <Typography variant='h5' textAlign={'center'}>{pregunta.pregunta}</Typography>
                                </Grid>
                                <Grid item xs={12} display={'flex'} justifyContent='center' sx={{ marginY: '50px' }}>
                                    <FormControl sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: '20px 0'
                                    }}>
                                        <RadioGroup>
                                            {
                                                respuestasArray.map((respuestaObj, index) => {
                                                    const { clave, respuesta } = respuestaObj as { clave: SelectedValue | 'correcta', respuesta: string }
                                                    if (clave !== 'correcta')
                                                        return (
                                                            <FormControlLabel onClick={() => onHandleSelect(clave)} key={index} value={clave} control={<Radio />} label={respuesta} />
                                                        )
                                                })
                                            }
                                        </RadioGroup>
                                        <Grid item xs={12} sx={{ marginY: '50px' }}>
                                            <Button onClick={onHandleSubmit} size='large' fullWidth>Enviar</Button>
                                        </Grid>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Card>
                    </fieldset>
                </Grid>
            </Grid>
        </MainLayout >
    )
}

export default PlayPage

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: any = []
    for (let i = 1; i <= 10; i++) {
        paths = [...paths, { params: { id: i.toString() } }]
    }

    return {
        paths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    try {
        /* eslint-disable-next-line no-unused-vars */
        const { createdAt, updatedAt, ...pregunta } = await dbQuestion.get(context.params?.id as string) as any

        if (!pregunta) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }

        return {
            props: {
                pregunta,
                ok: true
            },
            revalidate: 86400, // En segundos (60 * 60 * 24 = 1 día)
        }
    } catch (error) {
        console.error('Ocurrió un error:', error)

        return {
            props: {
                message: 'Estamos trabajando en más preguntas. Por favor, vuelve más tarde.',
                ok: false
            }
        }
    }
}
