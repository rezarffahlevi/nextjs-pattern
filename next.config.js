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
    // images: {
    //     remotePatterns: [
    //     {
    //         protocol: 'https',
    //         hostname: '**',
    //         port: '',
    //         pathname: '**',
    //     },
    //     ],
    //     domains: [
    //     'localhost',
    //     'fcprod.azurewebsites.net',
    //     'media.21cineplex.com'
    //     ],
    // },

    // experimental: {
    //     images: {
    //         unoptimized: true,
    //     },
    // },
}

module.exports = nextConfig
