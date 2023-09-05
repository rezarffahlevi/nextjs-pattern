/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    reactStrictMode: true,
    // swcMinify: true,
    // // i18n: {
    // //     locales: ['en'],
    // //     defaultLocale: 'en',
    // // },
    // webpack(config) {
    //     config.module.rules.push({
    //     test: /\.svg$/i,
    //     issuer: /\.[jt]sx?$/,
    //     use: ['@svgr/webpack'],
    //     })
    //     return config
    // },
    // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    //     config.plugins.push(
    //      new webpack.ProvidePlugin({
    //      $: "jquery",
    //      jQuery: "jquery",
    //      "window.jQuery": "jquery",
    //   }));
    //   return config;
    // },
    images: {
        remotePatterns: [
        {
            protocol: 'http',
            hostname: '**',
            port: '',
            pathname: '**',
        },
        ],
        domains: [
        'localhost',
        'vistatstsvr.flixcinema.com',
        ],
    },

    // experimental: {
    //     images: {
    //         unoptimized: true,
    //     },
    // },
}

module.exports = nextConfig
