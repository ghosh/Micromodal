import eslint from 'rollup-plugin-eslint'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import filesize from 'rollup-plugin-filesize'
import uglifyES from 'rollup-plugin-uglify-es'
import conditional from 'rollup-plugin-conditional'

const type = process.env.TARGET
const pkg = require('./package.json')

export default {
  name: 'MicroModal',
  input: 'src/index.js',
  output: {
    file: {
      es: pkg.module,
      umd: pkg.main
    }[type],
    format: type
  },
  plugins: [
    eslint({ exclude: ['package.json', 'example/**'] }),
    json(),
    babel({ exclude: 'node_modules/**' }),
    conditional(
      type === 'es', [
        uglifyES()
      ]
    ),
    filesize()
  ]
}