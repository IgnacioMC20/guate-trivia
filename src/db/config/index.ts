export const config = {
    development: {
      username: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      host: 'localhost',
      dialect: 'mysql',
    },
    test: {
      username: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
    },
    production: {
      username: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        ssl: true,
      },
    },
  }