module.exports = {
  content: ['client/src/**/*.{js,ts,jsx,tsx}', 'client/src/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // 'media' or 'class'
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
        gum: {
          100: 'rgba(255, 255, 255, 0.3)',
          200: 'rgb(135, 115, 180)',
          300: 'rgba(135, 115, 180, 0.10)',
          400: 'rgb(232, 115, 147)',
          500: '#878DD9',
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
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
        bruno: ['Bruno Ace SC', 'sans-serif'],
        montserrat: ['Montserrat'],
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
