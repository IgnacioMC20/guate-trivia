import { Dashboard, Diversity3 } from '@mui/icons-material'

import jaguar from '/public/jaguar.jpeg'
import perro from '/public/perro.jpeg'
import palomas from '/public/palomas.jpeg'
import tucanes from '/public/tucanes.jpeg'

export const links = [
    { href: '/', label: 'Inicio', icon: <Dashboard /> }, 
    { href: '/amigos', label: 'Amigos', icon: <Diversity3 /> },
]

export const dashboardImages = [
    { src: '/jaguar.png', alt: 'Jaguar', color: '#BDB2FF' },
    { src: '/play.png', alt: 'Boton de play', href: '/jugar', color: '#FFD6A5' },
]

export const images = [
    { id: 1, src: jaguar },
    { id: 2, src: perro },
    { id: 3, src: palomas },
    { id: 4, src: tucanes },
]