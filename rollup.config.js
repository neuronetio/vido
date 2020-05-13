import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/vido.umd.ts',
    output: {
      sourcemap: true,
      file: 'dist/vido.umd.js',
      format: 'umd',
      name: 'Vido',
    },
    plugins: [
      typescript({ target: 'es6' }),
      resolve({
        browser: true,
        //module: true
      }),
      commonjs({ extensions: ['.js', '.ts'] }),
    ],
  },
  {
    input: 'src/vido.umd.ts',
    output: {
      sourcemap: true,
      file: 'dist/vido.umd.min.js',
      format: 'umd',
      name: 'Vido',
    },
    plugins: [
      typescript({ target: 'es6' }),
      resolve({
        browser: true,
        //module: true
      }),
      commonjs({ extensions: ['.js', '.ts'] }),
      terser(),
    ],
  },
  {
    input: 'src/vido.ts',
    output: {
      sourcemap: true,
      file: 'dist/vido.esm.js',
      format: 'esm',
      name: 'Vido',
    },
    plugins: [
      typescript({ target: 'es6' }),
      resolve({
        browser: true,
        //module: true
      }),
      commonjs({ extensions: ['.js', '.ts'] }),
    ],
  },
  {
    input: 'src/vido.ts',
    output: {
      sourcemap: true,
      file: 'dist/vido.esm.min.js',
      format: 'esm',
      name: 'Vido',
    },
    plugins: [
      typescript({ target: 'es6' }),
      resolve({
        browser: true,
        //module: true
      }),
      commonjs({ extensions: ['.js', '.ts'] }),
      terser(),
    ],
  },
];
