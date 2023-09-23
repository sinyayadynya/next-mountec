/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
  env: {
    DRUPAL_CLIENT_ID: 'IAq501Oh4fDXo9H1zYDJeAHkGSHoDmWJKh2Lr2doaXo',
    DRUPAL_CLIENT_SECRET: '0IsYeKTo1gk_kWUchOn2zN-g_LQluxvjr8b1RLUVNAI',
  },
}

module.exports = nextConfig
