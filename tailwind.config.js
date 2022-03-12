module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gum: {
          100: 'rgba(255, 255, 255, 0.3)',
          200: 'rgb(135, 115, 180)',
          300: 'rgba(135, 115, 180, 0.10)',
          400: 'rgb(232, 115, 147)',
          500: '#878DD9',
        },
        sunset: {
          100: '#FECFEF',
          300: '#FC5B6A',
          500: '#FF9A9E',
          900: '#9D434B',
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
