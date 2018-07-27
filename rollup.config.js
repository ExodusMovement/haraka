import babel from 'rollup-plugin-babel';

export default {
  external: ['react', 'react-native'],
  input: 'src/behavior.js',
  output: { file: 'lib/index.js', format: 'cjs' },
  plugins: [
    babel({
      presets: [['es2015', { modules: false }], 'react', 'stage-0'],
      plugins: ['external-helpers'],
      comments: false,
      babelrc: false
    })
  ]
};
