import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screen: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        poppins: ['var(--poppins)', 'sans-serif'],
        roboto: ['var(--roboto)', 'sans-serif'],
      },
      colors: {
        primary: '#fd3d57',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
