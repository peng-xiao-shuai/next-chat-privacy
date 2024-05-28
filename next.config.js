const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  compress: true,
  webpack: (config) => {
    // 设置别名
    config.resolve.alias['@'] = path.join(__dirname, 'src')
    config.resolve.alias['@@'] = path.join(__dirname, 'public')
    config.resolve.alias['&'] = path.join(__dirname, 'src/server')

    // 重要: 返回修改后的配置
    return config
  },
}

module.exports = nextConfig