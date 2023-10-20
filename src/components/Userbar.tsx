import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { Card, Box } from '@mui/material'
import { Avatar } from '@mui/material'
import { Divider } from '@mui/material'
import { InputLabel } from '@mui/material'
import React from 'react'

export const Userbar = () => {
    return (
        <Card sx={{backgroundColor: '#9BF6FF', display: 'flex', alignItems: 'justify-content', justifyContent: 'space-between'}}>
            <Card sx={{display: 'flex', float: 'left',  backgroundColor: '#9BF6FF', paddingLeft: '10px', alignItems: 'center', maxWidth: '300px' }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' sx={{ padding: '5px'}} />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </Card>            
            <Card sx={{display: 'flex',  borderStyle: 'solid',  backgroundColor: '#FDFFB6', padding: '10px' , maxWidth:'200px' , alignItems: 'center'}}>
                <EmojiEventsIcon sx={{ fontSize: 40 }} />
                <Divider orientation="vertical" flexItem sx={{padding: '5px'}}/>
                <InputLabel>#,###</InputLabel>
            </Card>            
        </Card>
    )
}

