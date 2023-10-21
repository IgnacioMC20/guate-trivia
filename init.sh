#!/bin/bash

# Nombre del contenedor MySQL
CONTAINER_NAME="guate-trivia"

# Comprobar si el contenedor ya está en funcionamiento
if ! docker ps | grep -q "$CONTAINER_NAME"; then
  # Si el contenedor no está en funcionamiento, levantarlo con Docker Compose
  docker-compose up -d
fi

yarn 
yarn dev

