import jwt from 'jsonwebtoken'

export const signToken = (_id: string, email: string) => {
    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno')
    }

    return jwt.sign(
        // payload
        { _id, email },

        // Seed
        process.env.JWT_SECRET_SEED,

        // Opciones
        { expiresIn: '5d' }
    )
}

export const isValidToken = (token: string): Promise<string> => {
    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno')
    }

    if (token.length <= 10) {
        return Promise.reject('JWT no es válido')
    }

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if (err) return reject('JWT no es válido')

                const { _id } = payload as { _id: string }

                resolve(_id)
            })
        } catch (error) {
            reject('JWT no es válido')
        }
    })
}

export const getId = (token: string): string | null => {
    try {
        if (!process.env.NEXT_PUBLIC_JWT_SECRET_SEED) {
            throw new Error('No hay semilla de JWT - Revisar variables de entorno')
        }

        const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET_SEED) as {
            _id: string;
        }

        const { _id } = decodedToken

        return _id
    } catch (error) {
        console.error('Error al decodificar el token:', error)
        return null
    }
}
