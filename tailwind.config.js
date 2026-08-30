/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        golf: {
          50: '#f3f8f5',
          100: '#e2eee7',
          500: '#2c7752',
          700: '#20583e',
          800: '#194733',
          900: '#123d2a'
        }
      },
      boxShadow: {
        card: '0 10px 30px rgba(18, 61, 42, 0.08)'
      }
    }
  },
  plugins: []
}
