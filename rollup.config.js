import commonjs from '@rollup/plugin-commonjs'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      commonjs(),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
    ],
    external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)],
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
        targets: 'dist/@types',
      }),
    ],
  },
]
