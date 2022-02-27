module.exports = {
  eslint: {
    // TODO: fix eslint errors
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true,
    dirs: ['components', 'pages', 'lib', 'utils'],
  },
  typescript: {
    // TODO: fix typescript errors
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}
