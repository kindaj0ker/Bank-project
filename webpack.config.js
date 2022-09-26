const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevMode = process.env.NODE_ENV !== 'production';

const pages = ['about', 'ex', 'exa', 'get-card',  'log-in', 'policy', 'terms', 'testimonial', 'user-acc', 'why-us'];

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: isDevMode ? 'development' : 'production',

  entry: {
    about: './src/js/about.js',
    'get-card': './src/js/getCard.js',
    'log-in': './src/js/logIn.js',
    terms: './src/js/terms.js',
    testimonial: './src/js/testimonial.js',
    'user-acc': './src/js/userAcc.js',
    'why-us': './src/js/whyUs.js',
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].[hash].js',
    assetModuleFilename: "images/[name].[hash][ext][query]",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [
          isDevMode ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            }
          }, 
          'css-loader'
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ],
  },
  
  plugins: [].concat(
    pages.map((page) => {
        return new HtmlWebpackPlugin({
          template: `./src/html/${page}.html`,
          inject: true,
          chunks: [page],
          filename: `${page}.html`,
        })
      }),
      new MiniCssExtractPlugin(),
  ),
  
  devtool: 'source-map', // to see source file in devtool path

  devServer: {
    static: './dist',
    hot: true,
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
