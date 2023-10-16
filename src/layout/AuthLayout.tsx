import Head from 'next/head'
import { FC } from 'react'

interface Props {
    title: string
    children: React.ReactNode

}

export const AuthLayout: FC<Props> = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>{`Guate Trivia | ${title}`}</title>

                <meta name='og:title' content={`Guate Trivia | ${title}`} />
            </Head>

            <main style={{
                backgroundColor: '#A0C4FF',
                width: '100%', /* Ocupar todo el ancho de la pantalla */
                minHeight: '100vh', /* Ocupar todo el alto de la pantalla */
                padding: '50px', /* Padding mínimo de 50px en todos los lados */
                boxSizing: 'border-box', /* Incluye el padding en el ancho y alto total */
                display: 'flex', /* Permite que los hijos se posicionen en fila */
                justifyContent: 'center', /* Centra los hijos horizontalmente */
                alignItems: 'center', /* Centra los hijos verticalmente */
            }}>
                {children}
            </main>
        </>
    )
}
