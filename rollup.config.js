import babel from 'rollup-plugin-babel'
export default {
  input: './src/instance/index.js',
  output: {
    file: './dist/vue.js',
    name: 'Vue',
    format: 'umd',
    sourcemap: false
  },
  pplugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
