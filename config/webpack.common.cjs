const path = require('node:path');
const manifest = require('../src/static/manifest.json');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const getHtmlPlugins = (filenames = []) => {
  return filenames.map(filename => {
    const filenameWithoutExtension = path.parse(filename).name;

    return new HtmlPlugin({
      title: manifest.name,
      filename,
      chunks: [filenameWithoutExtension],
    });
  });
};

module.exports = {
  entry: {
    popup: path.resolve(__dirname, '..', 'src', 'popup', 'Popup.tsx'),
    options: path.resolve(__dirname, '..', 'src', 'options', 'Options.tsx'),
    background: path.resolve(
      __dirname,
      '..',
      'src',
      'background',
      'background.ts'
    ),
    contentScript: path.resolve(
      __dirname,
      '..',
      'src',
      'contentScript',
      'contentScript.ts'
    ),
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    // Array format like [name] will resolve to the chunk that is currently being
    // processed by Webpack
    filename: '[name].js',
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource',
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
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '..', 'src', 'static'),
          to: path.resolve(__dirname, '..', 'dist'),
        },
      ],
    }),
    ...getHtmlPlugins([manifest.action.default_popup, manifest.options_page]),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
