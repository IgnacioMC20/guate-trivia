import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { UIContext } from '@/context'

let style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 'none',
    borderRadius: '10px',
    p: 4,
}

export const BasicModal = () => {
    const { isAnswerRight, rightText, rightTitle, wrongText, wrongTitle, isModalOpen, toggleModal, resetAnswer } = useContext(UIContext)
    const router = useRouter()

    const handleCloseModal = () => {

        if (isAnswerRight) {
            resetAnswer()
            const nextId = Number(router.query.id) + 1
            router.push(`/jugar/${nextId}`)
            toggleModal()
            return
        }

        toggleModal()
        resetAnswer()
        // router.reload()

    }

    style = {
        ...style,
        bgcolor: isAnswerRight ? '#CAFFBF' : '#FFADAD'
    }

    return (
        <div>
            <Modal
                open={isModalOpen}
            >
                <Box sx={style} display={'flex'} flexDirection={'column'}>
                    <Typography textAlign={'center'} variant="h6" component="h2" sx={{ mt: 2 }}>
                        {
                            isAnswerRight ? rightTitle : wrongTitle
                        }
                    </Typography>
                    <Typography textAlign={'center'} sx={{ my: 2 }}>
                        Tu respuesta es
                        {
                            isAnswerRight ? rightText : wrongText
                        }
                    </Typography>
                    <Button sx={{ mt: 2 }} onClick={handleCloseModal}>{
                        isAnswerRight ? 'Siguiente' : 'Reintentar'
                    }</Button>
                </Box>
            </Modal>
        </div>
    )
}