const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
// https://github.com/vercel/next.js/blob/canary/examples/using-preact/package.json
const withPreact = require('next-plugin-preact')

module.exports = withBundleAnalyzer(
  withPreact({
    // fix preact + react-hook-form error - https://github.com/preactjs/next-plugin-preact/issues/61
    experimental: {
      esmExternals: false,
    },
    eslint: {
      dirs: ['components', 'pages', 'lib', 'utils'],
    },
    images: {
      domains: ['ddragon.leagueoflegends.com'],
    },
    typescript: {
      // TODO: fix typescript errors
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    webpack(config, options) {
      // enable loading of .graphql files
      config.module.rules.push({
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: [options.defaultLoaders.babel, { loader: 'graphql-tag/loader' }],
      })
      // enable loading svg files
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      })

      return config
    },
  }),
)
