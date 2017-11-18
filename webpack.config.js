const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

// JavaScript rule that specifies what to do with .js files
const javascript = {
  test: /\.(js)$/,
  use: [{
    loader: 'babel-loader',
    options: {
      presets: ['env']
    }
  }]
};

const styles = {
  test: /\.(css)$/,
  use: ExtractTextPlugin.extract('css-loader')
};

const config = {
  devtool: 'source-map',
  entry: {
    App: './public/js/tourism.js'
  },
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    // we can use "substitutions" in file names like [name] and [hash]
    // name will be `App` because that is what we used above in our entry
    filename: '[name].bundle.js'
  },
  module: {
    rules: [javascript, styles]
  },
  plugins: [
    new ExtractTextPlugin('style.bundle.css'),

    // this plugin doesn't allow the css source map show
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      canPrint: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),

    new webpack.DefinePlugin({
      // plugin does a direct text replacement; hence the double quotes
      'process.env.NODE_env': '"production"'
    })
  ]
};


module.exports = config;
