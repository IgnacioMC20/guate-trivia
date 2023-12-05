/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // future: {
  //   // Activa el entorno de ejecución 'edge' para tu API route
  //   // Esto permite el uso de `NextResponse` en lugar de `Response` en Node.js
  //   api: {
  //     externalResolver: true,
  //     bodyParser: false,
  //     // Habilita el entorno 'edge' para tu API route
  //     // Esto soluciona el error relacionado con el retorno de una respuesta no compatible en Node.js
  //     // Más información: https://nextjs.org/docs/api-routes/edge-api-routes
  //     path: '/api', // Ruta de tu API route
  //     // Asegúrate de definir 'runtime' como 'edge'
  //     // Esto indica a Next.js que uses el entorno 'edge' para esta ruta específica
  //     // 'edge' permite usar `NextResponse` en lugar de `Response` en el entorno Node.js
  //     runtime: 'edge',
  //   },
  // },
}

module.exports = nextConfig
