import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import { builtinModules } from 'module'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

const isProduction = process.env.NODE_ENV === 'production'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': process.env.NODE_ENV,
      }),
      commonjs(),
      typescript({
        clean: true,
        rollupCommonJSResolveHack: true,
        useTsconfigDeclarationDir: true,
        tsconfig: './tsconfig.json',
        tsconfigOverride: {
          compilerOptions: {
            jsx: isProduction ? 'react-jsx' : 'react-jsxdev',
          },
        },
      }),
      isProduction && terser(),
    ],
    external: [
      ...builtinModules,
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.peerDependencies),
      ...[isProduction ? 'react/jsx-runtime' : 'react/jsx-dev-runtime'],
    ],
  },
  {
    input: './dist/@types/index.d.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'cjs',
      },
    ],
    plugins: [
      dts(),
      del({
        hook: 'buildEnd',
        runOnce: true,
        targets: 'dist/@types',
      }),
    ],
  },
]
