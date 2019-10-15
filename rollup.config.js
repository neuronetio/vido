import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'vido.ts',
    output: {
      sourcemap: true,
      file: 'vido.js',
      format: 'umd',
      name: 'Vido'
    },
    plugins: [
      typescript({ target: 'es6' }),
      resolve({
        browser: true
        //module: true
      }),
      commonjs({ extensions: ['.js', '.ts'] })
    ]
  },
  {
    input: 'vido.ts',
    output: {
      sourcemap: true,
      file: 'vido.min.js',
      format: 'umd',
      name: 'Vido'
    },
    plugins: [
      typescript({ target: 'es6' }),
      resolve({
        browser: true
        //module: true
      }),
      commonjs({ extensions: ['.js', '.ts'] }),
      terser()
    ]
  },
  {
    input: 'vido.ts',
    output: {
      sourcemap: true,
      file: 'vido.esm.js',
      format: 'esm',
      name: 'Vido'
    },
    plugins: [
      typescript({ target: 'es6' }),
      resolve({
        browser: true
        //module: true
      }),
      commonjs({ extensions: ['.js', '.ts'] })
    ]
  },
  {
    input: 'vido.ts',
    output: {
      sourcemap: true,
      file: 'vido.esm.min.js',
      format: 'esm',
      name: 'Vido'
    },
    plugins: [
      typescript({ target: 'es6' }),
      resolve({
        browser: true
        //module: true
      }),
      commonjs({ extensions: ['.js', '.ts'] }),
      terser()
    ]
  }
];
