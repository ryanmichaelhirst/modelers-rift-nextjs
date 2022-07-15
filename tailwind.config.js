module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#D886FF',
        secondary: '#4E2860',
        tertiary: '#08090A',
        sunset: {
          100: '#FECFEF',
          300: '#FC5B6A',
          500: '#FF9A9E',
          800: '#7F2833',
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
      keyframes: {
        pan: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-250px * 7))' },
        },
      },
      animation: {
        pan: 'pan 40s linear infinite',
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
