import { terser } from 'rollup-plugin-terser'
import { eslint } from 'rollup-plugin-eslint'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import filesize from 'rollup-plugin-filesize'

const pkg = require('./package.json')

// dev build if watching, prod build if not
const isProduction = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'MicroModal'
    },
    {
      file: pkg.module,
      format: 'es'
    },
    {
      file: pkg.jsdelivr,
      format: 'umd',
      name: 'MicroModal'
      compact: true
    }
  ],
  plugins: [
    eslint({ exclude: 'package.json' }),
    json(),
    babel({ exclude: 'node_modules/**' }),
    isProduction && terser(),
    isProduction && filesize()
  ]
}
