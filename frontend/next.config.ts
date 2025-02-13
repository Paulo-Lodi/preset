import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/', // Redireciona a rota raiz
        destination: '/login', // Para a rota de login
        permanent: true, // Define como um redirecionamento permanente (status HTTP 308)
      },
    ];
  },
};

export default nextConfig;

