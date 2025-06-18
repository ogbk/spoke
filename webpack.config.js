const webpack = require('webpack');

const dotenv = require('dotenv').config({
  path: `${__dirname}/.env`,
});
const { CLIENT_PORT } = require('./port_config');

module.exports = {
  entry: `${__dirname}/client/app/components/index.js`,
  output: {
    path: `${__dirname}/client/public`,
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: `${__dirname}/client/public`,
    },
    compress: true,
    port: CLIENT_PORT,
  },
  mode: 'development',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /(node_modules)/ },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'], exclude: /(node_modules)/ },
      { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'], exclude: /(node_modules)/ },
      { test: /\.(txt|jl)$/i, use: 'raw-loader', exclude: /(node_modules)/ },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': dotenv.parsed,
    }),
  ]
};
