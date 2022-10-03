const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['components', 'lib', 'pages', 'routers', 'types', 'utils'],
  },
  images: {
    domains: ['ddragon.leagueoflegends.com', 'files.stripe.com'],
  },
  // typescript: {
  // https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
  webpack(config, options) {
    // enable loading svg files
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
})
