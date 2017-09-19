module.exports = (ctx) => ({
  parser: 'postcss-scss',
  plugins: {
    'postcss-import': {
      root: process.cwd()
    },
    'postcss-uncss': {
      'html': ['example/index.html'],
      'ignore': ['.modal*', '.micromodal*'],
      'report': false
    },
    'cssnano': ctx.env === 'production' ? {preset: 'default'} : false
  }
})
