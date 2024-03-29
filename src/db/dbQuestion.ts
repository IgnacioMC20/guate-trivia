import axios from 'axios'

import { db } from '.'
import { Question } from './models'

export const get = async (id: string) => {

    const msInTwoDays = 30 * 24 * 60 * 60 * 1000 // 30 días en milisegundos

    try {
        // Conectar a la base de datos
        await db.connect()

        // Buscar la pregunta en MongoDB
        const question = await Question.findOne({ idPregunta: id })

        if (!question) {
            // La pregunta no existe en la base de datos, realiza la solicitud al endpoint
            const response = await axios.get(`http://52.37.29.183/preguntas.php?nivel=${id}`)
            console.log(response)
            const data = response.data

            if(data.error){
                throw new Error(data.error)
            }

            // Verificar si se obtuvo la pregunta
            if (!data || !data.pregunta || !data.respuestas) {
                throw new Error('No se pudo obtener la pregunta desde el endpoint.')
            }

            // Crear una nueva pregunta en MongoDB
            const newQuestion = new Question({
                idPregunta: id,
                pregunta: data.pregunta,
                respuestas: {
                    A: data.respuestas.A,
                    B: data.respuestas.B,
                    C: data.respuestas.C,
                    correcta: data.respuestas.correcta,
                },
            })

            await newQuestion.save()
            await db.disconnect()

            return newQuestion.toJSON()
        }

        // Verifica si han pasado más de 2 días desde la última actualización
        const currentDate = new Date().getTime() // Obtiene la marca de tiempo actual
        const updatedAt = question.get('updatedAt')// Obtiene la marca de tiempo de updatedAt
        const timeDifference = currentDate - updatedAt

        if (timeDifference > msInTwoDays) {
            // Realiza la solicitud al endpoint para obtener la pregunta actualizada
            try {
                const response = await axios.get(`http://52.37.29.183/preguntas.php?nivel=${id}`)
                const data = response.data

                // Verificar si se obtuvo la pregunta
                if (data && data.pregunta && data.respuestas) {
                    // Actualiza la pregunta en la base de datos
                    question.pregunta = data.pregunta
                    question.respuestas = {
                        A: data.respuestas.A,
                        B: data.respuestas.B,
                        C: data.respuestas.C,
                        correcta: data.respuestas.correcta,
                    }
                    await question.save()
                }
            } catch (error) {
                return question.toJSON()
            }

        }

        // Desconectar de la base de datos
        await db.disconnect()
        return question.toJSON()
    } catch (error) {
        console.error('Ocurrió un error:', error)
    }
}