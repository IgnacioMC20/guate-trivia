import { Container } from '@react-email/container'
import { Html } from '@react-email/html'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'

interface Props{
  firstName: string
}

// Styles for the email template
const main = {
  backgroundColor: '#ffffff',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
}

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
}

const paragraph = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
}

const link = {
  fontSize: '18px',
  lineHeight: '1.4',
  color: '#484848',
  textDecoration: 'none',
}

export const EmailTemplate = ({firstName}: Props) => {
  const resetLink = '/auth/reset-password?token=1234567890'
  return (
    <Html>
    <Section style={main}>
      <Container style={container}>
        <Text style={heading}>Hola, {firstName}!</Text>
        <Text style={paragraph}>
          Has solicitado un cambio de contraseña. Haz click en el siguiente enlace para cambiarla:
        </Text>
        <a href={resetLink} style={link}>
          Reset Password
        </a>
        <Text style={paragraph}>
          Si tu no has solicitado este cambio, por favor ignora este correo.
        </Text>
      </Container>
    </Section>
  </Html>
  )
}
