import { SearchOutlined } from '@mui/icons-material'
import { IconButton, InputBase, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

interface Props {
    title: string
}

export const SearchFriend = ({ title }: Props) => {

    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (router.query.s) {
            setSearchTerm(router.query.s as string)
        }
    }, [router.query.s])

    const handleSubmit = async () => {
        if (searchTerm === '') return
        router.push(`/amigos/buscar?s=${searchTerm}`)
    }
    return (
        <Typography variant='h1' sx={{ display: 'flex', alignItems: 'center', marginBottom: '100px', justifyContent: 'space-between' }}>
            {title}
            <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto', marginLeft: '20px' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Buscar usuarios"
                    inputProps={{ 'aria-label': 'Buscar usuarios' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconButton onClick={handleSubmit} sx={{ p: '10px' }} aria-label="search">
                    <SearchOutlined />
                </IconButton>
            </Paper>
        </Typography>
    )
}
