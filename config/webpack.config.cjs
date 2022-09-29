const path = require('node:path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '..', 'src', 'index.tsx'),
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
    filename: '[name].[fullhash].bundle.js',
  },
};
