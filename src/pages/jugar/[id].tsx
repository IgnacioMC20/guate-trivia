import { GetStaticPaths, GetStaticProps } from 'next'

import { dbQuestion } from '@/db'
import { IQuestion } from '@/interfaces'
import { MainLayout } from '@/layout'

const PlayPage = ({ pregunta }: IQuestion) => {
    return (
        <MainLayout pageDescription='Jugar' title='Jugar'>
            <h1>Jugar</h1>
            <p>
                {
                    // parse json 

                    JSON.stringify(pregunta)
                }
            </p>
        </MainLayout>
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
        fallback: 'blocking', // También puede ser true o 'blocking'
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
                pregunta
            },
            revalidate: 86400, // En segundos (60 * 60 * 24 = 1 día)
        }
    } catch (error) {
        console.error('Ocurrió un error:', error)

        return {
            notFound: true, // Otra opción es devolver una página no encontrada en caso de error
        }
    }
}
