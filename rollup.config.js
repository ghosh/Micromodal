import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';

export default {
	moduleName: 'MicroModal',
  entry: 'src/index.js',
  format: 'umd',
  plugins: [
  	eslint(),
  	babel({
  		exclude: 'node_modules/**'
  	})
  ],
  dest: 'dist/micromodal.js',
};