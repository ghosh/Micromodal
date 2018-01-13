import eslint from 'rollup-plugin-eslint'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import filesize from 'rollup-plugin-filesize'
import uglifyES from 'rollup-plugin-uglify-es'

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'MicroModal',
      file: 'dist/micromodal.js',
      format: 'umd'
    },
    plugins: [
      eslint({ exclude: ['package.json', 'example/**'] }), // lint javascript
      json(), // allows js to read package.json
      babel({ exclude: 'node_modules/**' }),
      filesize()
    ]
  },

  // ES module (for bundlers) build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/micromodal.es.js',
      format: 'es'
    },
    plugins: [
      json(), // allows js to read package.json
      uglifyES() // minifies es build
    ]
  }
]
