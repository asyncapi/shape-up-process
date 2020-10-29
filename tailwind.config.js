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
    stroke: theme => ({
      'white': theme('colors.white'),
      'gray-200': theme('colors.gray.200')
    }),
    fill: theme => ({
      'gray-300': theme('colors.gray.300')
    }),
  },
}