import mongoose, { Model, Schema, model } from 'mongoose'

import { IQuestion } from '@/interfaces'

const questionSchema = new Schema({
    idPregunta: {
        type: String,
        required: true,
        unique: true,
    },
    pregunta: {
        type: String,
        required: true,
    },
    respuestas: {
        A: String,
        B: String,
        C: String,
        correcta: String,
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
          // Elimina el campo _id y __v del resultado
          delete ret._id
          delete ret.__v
        }
      }
})

const Question: Model<IQuestion> = mongoose.models.Question || model('Question', questionSchema)

export default Question
