#!/bin/bash

# Cargar las variables de entorno desde el archivo .env
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Nombre del contenedor MySQL
CONTAINER_NAME="guate-trivia-mysql"

# Ruta al archivo init.sql en tu sistema local
INIT_SQL_FILE="./init.sql"

# Nombre de usuario de MySQL
MYSQL_USER="root"

# Comprobar si el contenedor ya está en funcionamiento
if ! docker ps | grep -q "$CONTAINER_NAME"; then
  # Si el contenedor no está en funcionamiento, levantarlo con Docker Compose
  docker-compose up -d
fi

# # Copiar el archivo init.sql al contenedor MySQL
docker cp "$INIT_SQL_FILE" "$CONTAINER_NAME:/init.sql"

# # Conectarse al contenedor MySQL en modo interactivo
docker exec -it "$CONTAINER_NAME" mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD"

# # Ejecutar el script SQL desde el contenedor MySQL
source /init.sql;