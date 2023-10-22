import { useRouter } from 'next/router'

interface AuthRouteProps {
    children: React.ReactNode
}

export const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
    const router = useRouter()

    // Verifica la autenticación aquí (puedes usar tu lógica de autenticación)
    // const isAuthenticated = false // Reemplaza con tu lógica de autenticación

    // if (isAuthenticated) {
    //     // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    //     router.push('/')
    //     return null
    // }

    // Si el usuario está autenticado, muestra el contenido de la ruta protegida
    return <>{children}</>
}

