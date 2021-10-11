/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: ['@snowpack/plugin-typescript'],
  packageOptions: {
    types: true,
  },
  devOptions: {
    port: 8000,
  },
  buildOptions: {
    out: 'dist',
    sourcemap: true,
  },
  alias: {
    '@components/*': 'client/src/components/*',
    '@assets/*': 'client/src/assets/*',
    '@hooks/*': 'client/src/hooks/*',
    '@store/*': 'client/src/store/*',
    '@customtypes/*': 'client/src/types/*',
  },
}
