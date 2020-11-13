module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    require('@tailwindcss/ui'),
  ],
  theme: {
    typography: theme => ({
      default: {
        css: {
          a: {
            color: theme('colors.pink.500'),
            fontWeight: theme('fontWeight.semibold'),
            textDecoration: 'none',
            '&:hover': {
              color: theme('colors.pink.700'),
            },
          }
        }
      }
    }),
    stroke: theme => ({
      'white': theme('colors.white'),
      'gray-200': theme('colors.gray.200')
    }),
    fill: theme => ({
      'gray-300': theme('colors.gray.300'),
      'gray-500': theme('colors.gray.500')
    }),
    extend: {
      height: {
        100: '25rem'
      }
    }
  },
  variants: {
    margin: ['responsive', 'hover', 'focus', 'group-hover'],
  },
}