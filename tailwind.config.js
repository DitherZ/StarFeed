/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#09090b',
        panel: '#111114',
        border: '#23232a'
      },
      fontFamily: {
        display: ['"DM Mono"', 'monospace'],
        body: ['"Geist"', 'system-ui', 'sans-serif']
      },
      keyframes: {
        fadein: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        pulse_soft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' }
        }
      },
      animation: {
        fadein: 'fadein 0.4s ease both',
        shimmer: 'shimmer 2s linear infinite',
        pulse_soft: 'pulse_soft 1.8s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
