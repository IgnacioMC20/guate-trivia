import Head from 'next/head'
import React, { FC } from 'react'

import { Navbar } from '@/components'
import { SideMenu } from '@/components/SideMenu'

interface Props {
    children: React.ReactNode
    title: string
    pageDescription: string
}

export const MainLayout: FC<Props> = ({ children, title, pageDescription }) => {
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

            <SideMenu />
            <main style={{
                padding: '10px',
                height: 'auto',
            }}>
                {children}
            </main>

            <footer>

            </footer>
        </>
    )
}
