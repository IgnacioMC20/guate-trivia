import { useRouter } from 'next/router'

interface PrivateRouteProps {
    children: React.ReactNode
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const router = useRouter()

    // Verifica la autenticación aquí (puedes usar tu lógica de autenticación)
    const isAuthenticated = true // Reemplaza con tu lógica de autenticación

    if (!isAuthenticated) {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión
        router.push('/acceso/iniciar-sesion')
        return null
    }

    // Si el usuario está autenticado, muestra el contenido de la ruta protegida
    return <>{children}</>
}
