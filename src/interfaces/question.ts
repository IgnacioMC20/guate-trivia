export interface IQuestion {
  idPregunta: string
  pregunta: string
  respuestas: {
    A: string
    B: string
    C: string
    correcta: string
  }
}

export interface IQuestionFE {
  idPregunta: string;
  pregunta: string;
  respuestas: {
      [key: string]: string;
  };
}