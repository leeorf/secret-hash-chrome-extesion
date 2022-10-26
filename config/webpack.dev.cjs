const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common.cjs');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
});
