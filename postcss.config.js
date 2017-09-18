module.exports = (ctx) => ({
  parser: 'postcss-scss',
  plugins: {
    'postcss-import': {
      root: process.cwd()
    },
    'cssnano': ctx.env === 'production' ? {preset: 'default'} : false
  }
})
