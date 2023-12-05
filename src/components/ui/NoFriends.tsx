interface Props {
  message?: string
}

export const NoFriends = ({ message }: Props) => {

  if (message) return (
    <div>{message}</div>
  )

  return (
    <div>Aun no tienes amigos</div>
  )
}
