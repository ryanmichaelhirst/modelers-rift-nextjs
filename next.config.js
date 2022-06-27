const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
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
})
