module.exports = (ctx) => ({
  parser: 'postcss-scss',
  plugins: {
    'postcss-import': {
      root: process.cwd()
    },
    // 'postcss-uncss': ctx.env === 'production' ? {
    //   'html': ['example/index.html'],
    //   'ignore': ['.modal*', '.micromodal*', 'mm-fadeIn', 'mm-slideIn'],
    //   'report': false
    // } : false,
    'cssnano': ctx.env === 'production' ? {preset: 'default'} : false
  }
})
