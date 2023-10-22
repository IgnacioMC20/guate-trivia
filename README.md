# Guía para Levantar el Proyecto con Docker

Este proyecto utiliza un contenedor de Docker para ejecutar una base de datos MySQL. A continuación, se detallan los pasos para configurar y ejecutar el proyecto.

## Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos previos en tu sistema:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (con Yarn o NPM)

## Paso 1: Clonar el Repositorio

Clona este repositorio a tu máquina local utilizando Git:

```bash
git clone https://github.com/tu-usuario/tu-proyecto.git
cd tu-proyecto
```

## Paso 2: Instalar las Dependencias
Para instalar las dependencias del proyecto, utiliza Yarn o NPM:

```bash
# Usando Yarn
yarn install

# O usando NPM
npm install
```
## Paso 3: Iniciar la Aplicación en el Puerto 3000
Puedes iniciar la aplicación en el puerto 3000 con el siguiente comando:

```bash
# Usando Yarn
yarn dev

# O usando NPM
npm run dev
```

La aplicación estará disponible en http://localhost:3000. Abre tu navegador y accede a esa URL.

## Paso 4: Crear el Archivo .env
Copia el archivo .env.example y crea un nuevo archivo .env para tener la contrasena de la base de datos

## Paso 5: Configuración del Contenedor de Docker
El contenedor de Docker se utilizará para ejecutar la base de datos MongoDB necesaria para el proyecto. Asegúrate de tener Docker instalado en tu sistema.

Ejecuta el siguiente comando para iniciar el contenedor de Docker:

```bash
docker-compose up -d
```

¡Eso es todo! Ahora puedes acceder a tu aplicación en http://localhost:3000 con la base de datos en el contenedor de Docker.


