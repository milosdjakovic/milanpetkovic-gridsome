module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.svelte'
  ],
  theme: {
    extend: {
      colors: {
        'fluo-green' : 'rgb(47, 250, 145)'
      },
      boxShadow: {
        'bottom-fluo': '0 2px 0 rgb(47, 250, 145)',
        'bottom-light': '0 2px 0 #f7fafc'
      }
    },
  },
  variants: {
      textColor: ['responsive', 'hover', 'focus', 'group-hover'],
      margin: ['responsive', 'first']
  },
  plugins: [],
}
