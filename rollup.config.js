import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'vido.umd.ts',
    output: {
      sourcemap: true,
      file: 'vido.umd.js',
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
    input: 'vido.umd.ts',
    output: {
      sourcemap: true,
      file: 'vido.umd.min.js',
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
