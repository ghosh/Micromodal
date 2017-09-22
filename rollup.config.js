import eslint from 'rollup-plugin-eslint'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'

export default {
  name: 'MicroModal',
  input: 'src/index.js',
  output: {
    format: 'umd',
    file: 'dist/micromodal.js'
  },
  plugins: [
    eslint({ exclude: ['package.json', 'example/**'] }),
    json(),
    babel({ exclude: 'node_modules/**' })
  ]
}
