const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { PRODUCTION, PORT = 9000 } = process.env;
const noop = () => undefined;
const dist = 'dist';

module.exports = {
  mode: PRODUCTION ? 'production' : 'development',
  entry: {
    vendor: ['react', 'react-dom', 'lodash-es'],
    select: './src/select/index.tsx',
    demo: './src/index.tsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './', dist),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, dist),
        ],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.sass'],
  },
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, dist),
    port: PORT,
    writeToDisk: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: dist,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    PRODUCTION ? new CompressionWebpackPlugin() : noop,
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
  },
};
