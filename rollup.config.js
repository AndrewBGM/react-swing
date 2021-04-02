import { builtinModules } from 'module'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

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
      typescript({
        clean: true,
        rollupCommonJSResolveHack: true,
        useTsconfigDeclarationDir: true,
      }),
    ],
    external: [
      ...builtinModules,
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.peerDependencies),
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
        targets: 'dist/@types',
      }),
    ],
  },
]