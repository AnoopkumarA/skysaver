import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html',  "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {
      colors: {
        midnight: '#040714',
        deepsea: '#0a1428',
        aurora: '#2dd4bf',
        skywave: '#60a5fa',
        blossom: '#f472b6'
      },
      fontFamily: {
        display: ['Montserrat', 'Poppins', 'system-ui', 'sans-serif'],
        body: ['Poppins', 'Montserrat', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        xl: '22px',
        lg: '16px',
        md: '12px'
      },
      boxShadow: {
        glow: '0 20px 40px rgba(15, 23, 42, 0.35)'
      },
      animation: {
        pulsePing: 'pulsePing 3.8s infinite',
        ripple: 'ripple 3.8s infinite',
        float: 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 8s ease-in-out infinite',
        borderGlow: 'borderGlow 6s ease-in-out infinite',
        'shimmer-slow': 'shimmer-slow 3s ease-in-out infinite'
      },
      keyframes: {
        pulsePing: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.3)', opacity: '1' }
        },
        ripple: {
          '0%': { transform: 'scale(0.6)', opacity: '1' },
          '100%': { transform: 'scale(1.6)', opacity: '0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-20px) translateX(10px)' },
          '66%': { transform: 'translateY(-10px) translateX(-10px)' }
        },
        shimmer: {
          '0%, 100%': { opacity: '0.2', transform: 'translateY(-100%) scaleY(0.5)' },
          '50%': { opacity: '0.6', transform: 'translateY(0) scaleY(1)' }
        },
        borderGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'translateX(-100%)' },
          '50%': { opacity: '0.8', transform: 'translateX(100%)' }
        },
        'shimmer-slow': {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' }
        }
      }
    }
  },
  plugins: []
};

export default config;

