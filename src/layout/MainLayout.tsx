import Head from 'next/head'
import React, { FC } from 'react'

import { Navbar } from '@/components'

interface Props {
    children: React.ReactNode
    title: string
    pageDescription: string
    imageFullUrl?: string
}

export const MainLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
    return (
        <>
            <Head>
                <title>{`Guate-Trivia | ${title}`}</title>
                <meta name='description' content={pageDescription} />
                <meta name='og:title' content={`Guate-Trivia | ${title}`} />
                <meta name='og:description' content={pageDescription} />
            </Head>
            <nav>
                <Navbar />
            </nav>

            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }}>
                {children}
            </main>

            <footer>

            </footer>
        </>
    )
}
