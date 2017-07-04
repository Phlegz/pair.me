const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
  devtool: 'cheap-source-map',
  entry: {
    dashboardIndex: './src/index.jsx',
    challengeIndex: './src/challengeIndex.jsx'
  },
  output: {
    path: path.resolve(__dirname, '../server/public/scripts'),
    filename: '[name].bundle-generated.js',
    publicPath: '/scripts/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        options: {presets: ['es2015', 'react', 'stage-0']}
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: 'url-loader'
      }
    ]
  }

}
