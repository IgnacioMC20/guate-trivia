'use client'
import Head from 'next/head'
import { FC } from 'react'

import { Navbar, SideMenu } from '@/components'

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
