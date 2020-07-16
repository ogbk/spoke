const webpack = require('webpack');

// CAPTURE .env variables
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

// GET PORT --
const { CLIENT_PORT } = require('./port_config');

module.exports = {
  entry: `${__dirname}/client/app/components/index.js`,
  output: {
    path: `${__dirname}/client/public`,
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: `${__dirname}/client/public`,
    port: CLIENT_PORT,
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /(node_modules)/ },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'], exclude: /(node_modules)/ },
      { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'], exclude: /(node_modules)/ },
      { test: /\.(txt|jl)$/i, use: 'raw-loader', exclude: /(node_modules)/ },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
  ],
};
