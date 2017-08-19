import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default {
  moduleName: 'MicroModal',
  entry: 'src/index.js',
  format: 'umd',
  plugins: [
    eslint({ exclude: 'package.json' }),
    json(),
    babel({ exclude: 'node_modules/**' })
  ],
  dest: 'dist/micromodal.js',
};
