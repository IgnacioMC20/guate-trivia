interface Props {
  message?: string
}

export const NoFriends = ({ message }: Props) => {

  if (message) return (
    <div>{message}</div>
  )

  return (
    <div>Aun no tienes amigos? Prueba buscando usuarios para agregarlos a tu lista de amigos :)</div>
  )
}
