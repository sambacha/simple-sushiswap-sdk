const path = require('path');

module.exports = {
  entry: './dist/esm/index.js',
  output: {
    path: path.resolve(__dirname, 'web'),
    filename: 'simpleSushiswapSdk.js',
    library: 'simpleSushiswapSdk',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
  }
}; 
