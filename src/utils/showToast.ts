import { toast } from 'react-toastify'

export const showToast = (message: string, type: string = 'error') => {

    if (type === 'success') return toast.success(`🌴 ${message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
    })

    return toast.error(`🌴 ${message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
    })
}