const path = require('node:path');
const manifest = require('../manifest.json');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    popup: path.resolve(__dirname, '..', 'src', 'popup', 'Popup.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts'],
    alias: {
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@helpers': path.resolve(__dirname, 'src', 'helpers'),
      '@hooks': path.resolve(__dirname, 'src', 'hooks'),
      '@assets': path.resolve(__dirname, 'src', 'assets'),
      '@constants': path.resolve(__dirname, 'src', 'constants.ts'),
      '@utils': path.resolve(__dirname, 'src', 'utils.ts'),
    },
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    // Array format like [name] will resolve to the chunk that is currently being
    // processed by Webpack
    filename: '[name].[fullhash].bundle.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '..', 'src', 'manifest.json'),
          to: path.resolve(__dirname, '..', 'dist'),
        },
      ],
    }),
    new HtmlPlugin({
      title: manifest.name,
      filename: manifest.action.default_popup,
      chunks: ['popup'],
    }),
  ],
};
