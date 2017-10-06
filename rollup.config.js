import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/index.js',
  format: 'umd',
  moduleName: 'BrowserESModuleLoader',
  dest: 'dist/browser-es-module-loader.js',

  plugins: [
    nodeResolve({
      module: false,
      jsnext: false,
    })
  ],

  // skip rollup warnings (specifically the eval warning)
  onwarn: function() {}
};