module.exports = {
  purge: ['client/src/**/*.{js,ts,jsx,tsx}', 'client/src/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        space: {
          100: '#fff',
          200: '#838383',
          600: '#272424',
          700: '#3d3d3d',
          800: '#232323',
          900: '#000',
        },
      },
      height: {
        screen: '100vh',
      },
      minHeight: {
        24: '6rem',
      },
      minWidth: {
        44: '11rem',
      },
      gridTemplateColumns: {
        '1/9': '1fr 9fr',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['disabled'],
      boxShadow: ['disabled'],
      animation: ['hover'],
      borderWidth: ['hover'],
    },
  },
  plugins: [],
}
