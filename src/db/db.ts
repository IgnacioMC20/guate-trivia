import { Sequelize } from 'sequelize'

interface SequelizeConnection {
  instance: Sequelize | null // Almacenará la instancia de la conexión
  isConnected: boolean
}

const sequelizeConnection: SequelizeConnection = {
  instance: null,
  isConnected: false,
}

export const connect = async () => {
  if (sequelizeConnection.isConnected) {
    console.log('Ya estábamos conectados')
    return
  }

  try {
    // Inicializar una nueva instancia de Sequelize
    const sequelize = new Sequelize({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    })

    /* const sequelize = new Sequelize(process.env.DATABASE_URL, {
    * Aquí pueden ir opciones específicas según la base de datos que estés usando.
    *   dialect: 'postgres',
    *   logging: false, 
    * })
    */

    // Autenticar y verificar la conexión
    await sequelize.authenticate()
    console.log('Conexión establecida con éxito.')

    // Sincronizar modelos / esquemas con la base de datos
    // await sequelize.sync() // Descomentar si deseas que Sequelize sincronice los modelos con la base de datos

    sequelizeConnection.instance = sequelize
    sequelizeConnection.isConnected = true
  } catch (error) {
    console.error('No se puede conectar a la base de datos:', error)
  }
}

export const disconnect = async () => {
  if (process.env.NODE_ENV === 'development') return

  if (!sequelizeConnection.isConnected) return

  try {
    if (sequelizeConnection.instance) {
      // Cerrar la conexión
      await sequelizeConnection.instance.close()
      console.log('Desconexión exitosa.')
      sequelizeConnection.isConnected = false
    }
  } catch (error) {
    console.error('Error al desconectar:', error)
  }
}
