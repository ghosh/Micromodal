module.exports = () => ({
  // map: ctx.options.map,
  // parser: ctx.file.extname === '.sss' ? 'sugarss' : false,
  // plugins: {
  //   'postcss-import': { root: ctx.file.dirname },
  //   'cssnano': ctx.env === 'production' ? {} : false
  // }
  plugins: {
    'postcss-import': {
      root: process.cwd()
    },
    'cssnano': {
      preset: 'default',
    }
  }
})
