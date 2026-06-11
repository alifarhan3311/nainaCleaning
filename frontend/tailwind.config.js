/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,ts,jsx,tsx}',
    './services/**/*.{js,ts,jsx,tsx}',
    './*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#2563eb', 50: '#eff6ff', 100: '#dbeafe', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a' },
        secondary: { DEFAULT: '#0f172a', 800: '#1e293b', 900: '#0f172a' },
        accent: { DEFAULT: '#22c55e', 500: '#22c55e', 600: '#16a34a' },
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
